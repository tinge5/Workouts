import { supabase } from "../config/supabaseClient"
import { useEffect, useState } from "react"
import { useRStatus } from "./StartScreen"
import { useLocation } from "react-router-dom"
import CreatableSelect from "react-select/creatable"
import "./css/newplan.css";
import Header from "../Header"


export default function NewPlan(){
    const user = useRStatus()
    const [value, setValue] = useState("")
     

        return (
            <div className="screen">
                <Header />
                <h1>New Plan</h1>
                <div className="plan-card">
                    <div className="planning">
                        <span >Plan Name</span>
                        <input
                            type="text"
                            placeholder="hey"
                            />
                        
                        </div>

                    <div className="planning">
                    <span># of Weeks</span> 
                    <input
                            type="text"
                            placeholder="hey"
                            />
                     </div>

                    <div className="planning">
                        <span>Progressive Overload?</span>
                        <select
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            >
                            {user ? <option value={user.email}>{user.email}</option> : null} {/*Make this the users choice when */}
                            <option value="push">Yes</option>
                            <option value="pull">No</option>
                            </select>
                        

                    </div>
                    </div>
                </div>

        )
}