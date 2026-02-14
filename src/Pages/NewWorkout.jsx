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
    const [exercise, setExercise] = useState(location.state?.workout?.Exercise || "")
    console.log("Location state in NewWorkout:", location.state);
    const workout = location.state?.workout || null
    console.log("This is editing? ", editing)
    const maxWeeks = location.state?.maxWeeks || location.state?.workout?.plans?.Weeks || null
    console.log("Max weeks for this plan: ", maxWeeks)
    console.log("This is the workout ", exercise, " and this is the workout name ", workoutName)
    useEffect(() => {
        async function retriveWorkout(){
            if(!user){
                console.log("No authenticated user found.");
                return null;
            }
    } []})
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
                    <div className="planning">
                        <div className="exercise-header">
                        <p className= "titles">Exercise</p>
                        <input
                            className="inputs"
                            type="text"
                            placeholder={"bench"}
                            value={"bench"}
                            />
                        </div>
                        <div className='exercise-header'>
                        <p className= "titles">Sets</p>
                        <input
                            className="inputs-number"
                            type="number"
                            placeholder={1000}
                            value={1000}
                            />
                        </div>
                        <div className='exercise-header'>
                        <p className= "titles">Reps</p>
                        <input
                            className="inputs-number"
                            type="number"
                            placeholder={1000}
                            value={1000}
                            />
                        </div>
                        <div className='exercise-header'>
                        <p className= "titles">Weight</p>
                        <input
                            className="inputs-number"
                            type="number"
                            placeholder={1000}
                            value={1000}
                            />
                        </div>

                </div>
        </div>
    </div>
    )
}