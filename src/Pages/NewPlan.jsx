import { supabase } from "../config/supabaseClient"
import { useEffect, useState } from "react"
import { useRStatus } from "./StartScreen"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import CreatableSelect from "react-select/creatable"
import "./css/newplan.css";
import Header from "../Header"


export default function NewPlan(){
    const user = useRStatus()
    const location = useLocation()
    const navigate = useNavigate()
    const editing = location.state?.from === "edit"
    const name = (location.state?.name?.plan_name || null)
    const num = location.state?.name?.plan_number || null
    const [planID, setPlanID] = useState(location.state?.name?.planID || null)
    const [overload, setOverload] = useState("")
    const [plan_name, setPlan_name] = useState("")
    const [maxWeeks, setMaxWeeks] = useState("")
    const [plannumber, setPlannumber] = useState(location.state?.userplans || null)
    const [increase, setIncrease] = useState("")
    console.log("This is a ", editing, " edit from ", name)
    console.log("This is the current plan num ", num, " from planID ", planID)
    console.log("users total plans ", plannumber)
    
    async function deletePlan(){
        if(!user || planID === null){
            console.log("nah")
            return
        }
        const sure = window.confirm("Are you sure you want to delete tis plan")
        if(!sure){
            return
        }
        const {data: datas, error: errors} = await supabase
            .from("UserAccounts")
            .update({Number_of_plans: plannumber-1})
            .eq("id", user.id)
            .select()
            if(datas){
                console.log("updated ", datas)
            }
            if(errors){
                console.log("issue updated the total plan number for this")
            }
        const {data, error} = await supabase
            .from("plans")
            .delete()
            .eq("userID", user.id)
            .eq("planID", planID)
            .select()
        if(data){
            console.log("plan deleted", data)
            navigate("/plans")
        }
        if(error){
            console.log("delete didn't work")
        }

    }
    async function confrim() {
        if(!user){
            console.log("nah")
            return
        }
        if(overload === "" || plan_name === "" || maxWeeks === ""){
            alert("Please fill out everything before pressing confirm, try switching Progressive overload back and forth if stuck")
            return
        }
        if(!editing){
            const { data, error } = await supabase
                .from('UserAccounts')
                .update({ Number_of_plans: plannumber + 1})
                .eq('id', user.id)
                .single();
            if(data){
                console.log("updated user plan number")
            }
            if(error){
                console.log("error updating plan number ", error)
                return
            }
            setPlannumber(plannumber+1)

        }
        console.log(plannumber)
        const {data, error} = await supabase
            .from("plans")
            .upsert({
                increase: increase,
                Weeks: maxWeeks,
                Progressive_Overload: overload,
                plan_name: plan_name,
                userID: user.id,
                plan_number: num === null ? plannumber+1 : num

            },
            {onConflict: ["userID", "plan_number"]}
            )
            .eq("useID", user.id)
            .select()
        if(data){
            console.log("successful update")
        }
        if(error)
            console.log("error updating/creating", error)
        setTimeout(() => {
            navigate("/plans")
            
        }, 1000 )
    }
    useEffect(() => {
        async function retriveplan(){
            if(!user){
                console.log("no user")
                return
            }
            if(editing){
                const { data , error } = await supabase
                    .from('plans')
                    .select('*')
                    .eq('plan_name',name)
                    .eq('userID', user.id)
                
                if(data){
                    console.log("here is the plans ", data)
                    setIncrease(data[0].increase)
                    setMaxWeeks(data[0].Weeks)
                    setOverload(data[0].Progressive_Overload)
                    setPlan_name(data[0].plan_name)     
                    setPlanID(data[0].planID)               
                }
                else{
                    console.log("no data ", error)
                }
        }
        }
        retriveplan()
    }, [user]);
    
    useEffect(() => {
        console.log("overload = ", overload)
    }, [overload]);

        return (
            <div className="screen">
                <Header />
                <h1>New Plan</h1>
                <div className="plan-card">
                    <div className="planning">
                        <span >Plan Name</span>
                        <input
                            type="text"
                            placeholder={plan_name}
                            value={plan_name}
                            onChange={(e) => setPlan_name(e.target.value)}
                            />
                        
                        </div>

                    <div className="planning">
                    <span># of Weeks</span> 
                    <input
                            type="text"
                            placeholder={maxWeeks}
                            value={maxWeeks}
                            onChange={(e) => setMaxWeeks(e.target.value)}
                            />
                     </div>

                    <div className="planning">
                        <span>Progressive Overload?</span>
                        <select
                            value={overload}
                            onChange={(e) => setOverload(e.target.value)}
                            >
                            {overload && <option value="true">{overload && "Yes"}</option>} {/*Make this the users choice when coming from an edit perspective*/}
                            <option value="false">No</option>
                            <option value= "true" >Yes</option>
                            </select>
                    </div>
                    {overload === true && <div className="planning">
                        <span>Increase each week</span>
                        <select
                            value={increase}
                            onChange={(e) => setIncrease(e.target.value)}
                            >
                            {/*{user ? <option value={user.email}>{user.email}</option> : null} Make this the users choice when coming from an edit perspective*/}
                            {increase && <option value={increase}>{increase}</option>} {/*Make this the users choice when coming from an edit perspective*/}
                            <option value="Reps">Reps</option>
                            <option value="Weights">Weights</option>

                            </select>
                    </div> }
                    {overload === "true" && <div className="planning">
                        <span>Increase each week</span>
                        <select
                            
                            onChange={(e) => setValue(e.target.value)}
                            >
                            {/*{user ? <option value={user.email}>{user.email}</option> : null} Make this the users choice when coming from an edit perspective*/}
                            <option value="reps">Reps</option>
                            <option value="weight">Weights</option>
                            <option value="mix">Mix</option>

                            </select>
                    </div> }                    <div className="planning">
                        <button onClick={() => confrim()}className="confirm">Confirm</button>
                        
                    </div>
                    {editing &&
                    <div className ="planning">
                        <button className="delete"onClick={()=> deletePlan()}>Delete Plan</button>
                    </div>
                    }

                </div>
            </div>

        )
}