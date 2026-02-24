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
    const edit = location.state?.workout ? true : false
    const [editing, setEditing] = useState(false);
    const [workoutName, setWorkoutName] = useState(location.state?.workout?.Workout_name || "")
    const [exercise, setExercise] = useState(location.state?.workout?.Exercise || [])
    console.log("Location state in NewWorkout:", location.state);
    const workout = location.state?.workout || null
    console.log("This is editing? ", edit)
    const maxWeeks = location.state?.maxWeeks || location.state?.workout?.plans?.Weeks || null
    console.log("Max weeks for this plan: ", maxWeeks)
    console.log("This is the workout ", exercise, " and this is the workout name ", workoutName)

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
    fetch("/exercise.txt")
      .then((res) => res.text())
      .then((text) => {
        const parsed = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .map((line) => {
            const [name, weight] = line.split(",");

            return {
              label: name.replaceAll("-", " "),
              value: name,
              multiplier: parseFloat(weight)
            };
          });

        setOptions(parsed);
        console.log("Options for exercises: ", parsed)
      });
  }, []);

    useEffect(() => {
        if(!edit){
            setEditing(true)
        }
        
    }, [user, exercise, workoutName])
const workoutArray = exercise.map((item, i) => (
             <div key={i} className="planning">                    
                        <div className="exercise-header">
                        <p className= "titles">Exercise</p>
                        <CreatableSelect
                                options={options}
                                styles={{
                                    control: (base) => ({
                                    ...base,
                                    border: "1px solid #000000",
                                    width: "86px",
                                    borderRadius: "0px",
                                    maxWidth: "86px",
                                    minHeight: "unset",
                                    height: "20px",
                                    flex: "0 0 auto",
                                    boxShadow: "none",
                                    filter: "drop-shadow(0 0 0px #FF5005)",
                                    padding: 0
                                    }),
                                     singleValue: (base) => ({
                                        ...base,
                                        fontSize: '12px',
                                        color: 'black',
                                        margin: 0,
                                    }),
                                    valueContainer: (base) => ({
                                    ...base,
                                    padding: "0 0px"
                                    }),

                                    input: (base) => ({
                                    ...base,
                                    margin: 0,
                                    padding: 0
                                    }),

                                    indicatorsContainer: (base) => ({
                                    ...base,
                                    height: "100%"
                                    }),

                                    dropdownIndicator: (base) => ({
                                    ...base,
                                    padding: 0
                                    }),

                                    clearIndicator: (base) => ({
                                    ...base,
                                    padding: 0
                                    }),

                                    menu: (base) => ({
                                    ...base,
                                    width: "100px" 
                                    })
                                }}
                                value={item.exercise ? { label: item.exercise, value: item.exercise } : null}
                                onChange={(selectedOption) => {
                                    const updated = [...exercise];
                                    updated[i] = { ...updated[i], exercise: selectedOption?.value || null, weight_multiplier: selectedOption?.multiplier || null };
                                    setExercise(updated);
                                }}
                                isClearable
                                components={{
                                    ClearIndicator: null,
                                    IndicatorSeparator: null,
                                    DropdownIndicator: (props) => (
                                        <div {...props.innerProps} style={{ padding: 2 }}>
                                            <svg
                                            height="8"
                                            width="8"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            >
                                            <path d="M5 7l5 5 5-5H5z" />
                                            </svg>
                                        </div>
                                    )
                                }}
                                placeholder={item?.exercise || ""}
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
                        <p className= "titles"> </p>
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
                        <p className= "titles">Lbs</p>
                        </div>

                </div>
    ));
const workoutArray2 = exercise.map((item, i) => (
             <div key={i} className="planning">                    
                        <div className="exercise-header">
                        <p className= "titles">Exercise</p>
                        <input
                            className="inputs-exercise"
                            type="text" disabled={true}
                            placeholder={item?.exercise || ""}
                            value={item?.exercise ?? ""}
                            />
                        </div>
                        <div className='exercise-header'>
                        <p className= "titles">Sets</p>
                        <input
                            className="inputs-number"
                            type="number" disabled={true}
                            placeholder={item?.sets || null}
                            value={item?.sets ?? ""}
                            />
                        </div>
                        <div className='exercise-header'>
                        <p className= "titles">Reps</p>
                        <input
                            className="inputs-number"
                            type="number" disabled={true}
                            placeholder={item?.reps || null}
                            value={item?.reps ?? ""}
                            />
                        </div>
                        <div className='exercise-header'>
                        <p className= "titles"> </p>
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
                        <p className= "titles">Lbs</p>
                        </div>

                </div>
    ));
async function completeWorkout(){
    const sure = window.confirm("Are you finished the workout? This will log your workout and update your progress for the week.")
    if(sure){
        setTimeout(() => {
            navigate("/workouts")
            
        }, 1000 )
    }
}
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
        <div style={{display: "flex", flexDirection:"row", position: "relative", gap: "0px", marginBottom: "20px"}}>                 
          <text style={{fontSize: "xx-large"}}>New Workout</text>
          {!editing && <img src="../images/editWorkout.png" alt="next week" className="edit1"onClick={() => setEditing(true)}/>}
        </div>
                <div className="plan-card">
                    <div className="planning">
                        <input
                            className="inputs-name"
                            type="text" 
                            placeholder={workoutName || "Workout Name"}
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            />
                    </div>
                    {editing ? workoutArray : workoutArray2}
                    {editing && <img src="../images/plus2.png" alt="Add Plan" className="plus-icon" onClick={addExercise}/>}
                    {editing &&<button className="confirm" onClick={() => setEditing(false)}>Confirm</button>}
                    {!editing && <button className="finish" onClick={() => completeWorkout()}>Completed</button>}
        </div>
    

        </div>
    )
}