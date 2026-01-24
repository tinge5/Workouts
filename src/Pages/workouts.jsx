import "./css/workouts.css";
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
    const [exercise, setExercise] = useState([]);
    const [maxWeeks, setMaxWeeks] = useState(null)
    const location = useLocation();
    
    const curWeek = location.state?.week || 1;

    const [currentWeek, setCurrentWeek] = useState(location.state?.week || 1)
    const [planName, setPlanName] = useState(null);
    const planNumber = location.state?.planNumber || 1; // Default to plan 1 if not provided
    console.log("Navigated to Workouts page for Plan Number:", planNumber, currentWeek);
    useEffect(() => {
    async function DisplayWorkout() {
      if (!user) {
        console.log("No authenticated user found.");
        return null;
      }
      console.log("Value of CurrentWeek", currentWeek)
      console.log("Fetching workouts for user:", user.id);
      const { data, error } = await supabase
        .from('Workouts')
        .select(`WorkoutID, Workout_name, Exercise, week, plans:planID!inner  (
                planID,
                plan_number,
                plan_name,
                Current_week,
                Weeks 

        ),
                UserAccounts (
                id,
                username
            )
        )
    `)  
            .eq('userID', user.id)
            .eq('plans.plan_number', planNumber)
            .eq('plans.Current_week', currentWeek)
            .eq('week', currentWeek);

        if (!data || data.length === 0) {
            setWorkouts([]), {/*Sets the workouts to nothing so nothing is displayed when no workouts are there */}
            console.log("No workouts found for this user.");
            return;
            }


        if(data){
          console.log("Heres the users workouts:", data, data[0].UserAccounts.username, data[0].Exercise);
          setWorkouts(data);
          setExercise(data[0].Exercise)
          setMaxWeeks(data[0].plans.Weeks)
          setPlanName(data[0].plans.plan_name);
          console.log(workouts)
          console.log(exercise)

        }
        if(error){
          console.log("Error fetching number of plans:", error);
          return null;
        }
    }
    DisplayWorkout();
  }, [user, currentWeek]);
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
      {currentWeek < maxWeeks ? <img src="../images/next.png" alt="next week" className="next" onClick={() => setCurrentWeek((prev) => prev + 1)}/> : null}
      {currentWeek > 1 ? <img src="../images/back.png" alt="next week" className="back" onClick={() => setCurrentWeek((prev) => prev - 1)}/> : null}
      <h1 style={{ color: "white", textAlign: "center" }}> {planName ? planName : "Workouts"} </h1>
      <p>Week {currentWeek}</p>

      <div className="plans-card">
        {paragraphs}
        {addPlan ? <p key={plans} className="card">Plan {plans + 1}</p> : null}
        {workouts.map((workout) => (
        <div className="card" key = {workout.WorkoutID}>
            <p style={{alignSelf: "center"}}>{workout.Workout_name}</p>
          {workout.Exercise && workout.Exercise.length > 0 ? (
            workout.Exercise.map((ex, index) => (
              <div key={index} className="exercise-bar">
                <div className="workoutname">{ex.exercise}</div>   {ex.sets}x{ex.reps} {ex.weight ? ` @ ${ex.weight}` : ''}
            </div>
            ))
          ) : (
            <p>No exercises found for this workout.</p>
          )}
          </div>
        ))}
          

        <img src="../images/plus2.png" alt="Add Plan" className="plus-icon"/>

        </div>
      </div>
  );
}