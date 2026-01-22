import "./css/plans.css";
import { supabase } from "../config/supabaseClient.js";
import Header from "../Header.jsx";
import { useRStatus } from "./StartScreen.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function Workouts() {
    const paragraphs = [];
    const [plans, setPlans] = useState(0);
    const user = useRStatus();
    const [addPlan, setAddPlan] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const location = useLocation();
    const planNumber = location.state?.planNumber || 1; // Default to plan 1 if not provided
    console.log("Navigated to Workouts page for Plan Number:", planNumber);

    useEffect(() => {
    async function DisplayWorkout() {
      if (!user) {
        console.log("No authenticated user found.");
        return null;
      }
      console.log("Fetching workouts for user:", user.id);
      const { data, error } = await supabase
        .from('Workouts')
        .select(`WorkoutID, Workout_name, Exercise, week, plans:planID  (
                planID 
        ),
                UserAccounts (
                id,
                username
            )
        )
    `)  
            .eq('userID', user.id);

        if (!data || data.length === 0) {
            console.log("No workouts found for this user.");
            return;
            }


        if(data){
          console.log("Heres the users workouts:", data[0].UserAccounts.username, data[0].Exercise);
          setWorkouts(data);
        }
        if(error){
          console.log("Error fetching number of plans:", error);
          return null;
        }
    }
    DisplayWorkout();
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
    }
    useEffect(() => {
      if (addPlan) {
        AddNewPlan();
      }
    }, [addPlan]);

    for (let i = 0; i < plans; i++) {
      paragraphs.push(<p key={i} className="cards">Plan {i + 1}</p>);
    }
  return (
    <div className="screen">
      <Header />
      <h1 style={{ color: "white", textAlign: "center" }}>Plans Page</h1>

      <div className="plans-card">
        {paragraphs}
        {addPlan ? <p key={plans} className="cards">Plan {plans + 1}</p> : null}

        <img src="../images/plus2.png" alt="Add Plan" className="plus-icon"/>
      </div>
    </div>
  );
}