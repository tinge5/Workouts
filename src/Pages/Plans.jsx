import "./css/plans.css";
import { supabase } from "../config/supabaseClient.js";
import Header from "../Header.jsx";
import { useRStatus } from "./StartScreen.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Plans() {
    const [currentplan, setCurrentplan] = useState({})
    const [plans, setPlans] = useState(0);
    const user = useRStatus();
    const [addPlan, setAddPlan] = useState(false);
    const navigate = useNavigate();
    const [plandet, setPlandet] = useState([])

    useEffect(() => {
    async function PlanNumber() {
      if (!user) {
        console.log("No authenticated user found.");
        return null;
      }
      console.log(user)
      const { data, error } = await supabase
        .from('UserAccounts')
        .select('Number_of_plans')
        .eq('id', user.id)
        .single();

        if(data){
          console.log("Number of plans fetched:", data.Number_of_plans);
          setPlans(data.Number_of_plans);
        }
        if(error){
          console.log("Error fetching number of plans:", error);
          return null;
        }
    }
    PlanNumber();
  }, [user]);
  async function AddNewPlan() {
      if (!user) {
        console.log("No authenticated user found.");
        return;
      }
      const newplans = plans + 1;
      
      const { data, error } = await supabase
        .from('UserAccounts')
        .update({ Number_of_plans: newplans })
        .eq('id', user.id)
        .single();
      if (data) {
        console.log("Number of plans updated:", data.Number_of_plans);
        setPlans(data.Number_of_plans);
        setAddPlan(false);
      }
      if (error) {
        console.log("Error updating number of plans:", error);
        return;
      }
        const { data: myData, error: myError } = await supabase
        .from('plans')
        .insert([
          { userID: user.id ,
          plan_number: newplans}
        ])
        .select();
      if (myData) {
        console.log("New plan added:", myData);
      }
      if (myError) {
        console.log("Error adding new plan:", myError);
        return;
      }

    }
useEffect(() => {
  async function plansDetails(){
    if(!user){
      console.log("no user sorry")
      return
    }
  const {data, error} = await supabase 
      .from('plans')
      .select('*')
      .eq('userID', user.id);
  
    if(data){
      setPlandet(data)
      console.log("here's the plan details: ", data)
    }
    if(error){
      console.log(error)
    }
  }
  plansDetails()
},[user]);
    useEffect(() => {
      if (addPlan) {
        AddNewPlan();
      }
    }, [addPlan]);

 const paragraphs = Array.from({ length: plans }, (_, i) => (
  <p
    key={i + 1}
    className="cards"
    onClick={() => {
      const selectedPlan = plandet.find(plan => plan.plan_number === i + 1);
      setCurrentplan(selectedPlan);
      console.log(selectedPlan);
      navigate("/workouts", { state: { planNumber: i + 1, week: selectedPlan.Current_week, plan: selectedPlan, userplans: plans } });
}}
  >
    Plan {i + 1}
  </p>
));
  return (
    <div className="screen">
      <Header />
      <h1 style={{ color: "white", textAlign: "center" }}>Plans Page</h1>

      <div className="plans-card">
        {paragraphs}
        {addPlan ? <p key={plans} className="cards">Plan {plans + 1}</p> : null}

        <img src="../images/plus2.png" alt="Add Plan" className="plus-icon" onClick={() => navigate("/newplan", {state : {userplans: plans}}) }/>
      </div>
    </div>
  );
}