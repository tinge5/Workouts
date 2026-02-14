import { supabase } from "../config/supabaseClient"
import { useEffect, useState } from "react"
import { useRStatus } from "./StartScreen"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import CreatableSelect from "react-select/creatable"
import "./css/newworkout.css";
import Header from "../Header"
import { use } from "react"

export default function NewWorkout(){
    const user = useRStatus();
    const location = useLocation();
    const navigate = useNavigate();
    const editing = location.state?.workout ? true : false
    const [workoutName, setWorkoutName] = useState(location.state?.workout?.Workout_name || "")
    const [exercise, setExercise] = useState(location.state?.workout?.Exercise || [])
    console.log("Location state in NewWorkout:", location.state);
    const workout = location.state?.workout || null
    console.log("This is editing? ", editing)
    const maxWeeks = location.state?.maxWeeks || location.state?.workout?.plans?.Weeks || null
    console.log("Max weeks for this plan: ", maxWeeks)
    console.log("This is the workout ", exercise, " and this is the workout name ", workoutName)
    useEffect(() => {
        
    }, [user, exercise, workoutName])
const workoutArray = exercise.map((item, i) => (
             <div key={i} className="planning">                    
                        <div className="exercise-header">
                        <p className= "titles">Exercise</p>
                        <input
                            className="inputs"
                            type="text"
                            placeholder={item?.exercise || ""}
                            value={item?.exercise ?? ""}
                            onChange={(e) => {
                                const updated = [...exercise];
                                updated[i] = { ...updated[i], exercise: e.target.value };
                                setExercise(updated);
                                console.log("Updated exercise:", updated[i].exercise);
                                }}
                            />
                        </div>
                        <div className='exercise-header'>
                        <p className= "titles">Sets</p>
                        <input
                            className="inputs-number"
                            type="number"
                            placeholder={item?.sets || null}
                            value={item?.sets ?? ""}
                            onChange={(e) => {
                                const updated = [...exercise];
                                updated[i] = { ...updated[i], sets: Number(e.target.value) };
                                setExercise(updated);
                                console.log("Updated sets:", updated[i].sets);
                                }}
                            />
                        </div>
                        <div className='exercise-header'>
                        <p className= "titles">Reps</p>
                        <input
                            className="inputs-number"
                            type="number"
                            placeholder={item?.reps || null}
                            value={item?.reps ?? ""}
                            onChange={(e) => {
                                const updated = [...exercise];
                                updated[i] = { ...updated[i], reps: Number(e.target.value) };
                                setExercise(updated);
                                console.log("Updated reps:", updated[i].reps);
                                }}
                            />
                        </div>
                        <div className='exercise-header'>
                        <p className= "titles">Weight</p>
                        <input
                            className="inputs-number"
                            type="number"
                            placeholder={item?.weight || null}
                            value={item?.weight ?? ""}
                            onChange={(e) => {
                                const updated = [...exercise];
                                updated[i] = { ...updated[i], weight: Number(e.target.value) };
                                setExercise(updated);
                                console.log("Updated weight:", updated[i].weight);
                                }}
                            />
                        </div>

                </div>
    ));
const addExercise = () => {
  setExercise(prev => [
    ...prev,
    {
      exercise: "",
      sets: "",
      reps: "",
      weight: "",
      "rep increase": 0,
      "weight increase": 0
    }
  ]);
};
  
    return (
        <div className="screen">
        <Header />
                <h1>New Workout</h1>
                <div className="plan-card">
                    <div className="planning">
                        <input
                            className="inputs-name"
                            type="text"
                            placeholder={workoutName}
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            />
                    </div>
                    {workoutArray}
                    <img src="../images/plus2.png" alt="Add Plan" className="plus-icon" onClick={addExercise}/>
                    <button className="confirm">Confirm</button>
        </div>
    

        </div>
    )
}