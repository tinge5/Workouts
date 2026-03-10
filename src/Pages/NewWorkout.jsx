import { supabase } from "../config/supabaseClient"
import { useEffect, useState } from "react"
import { useRStatus } from "./StartScreen"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import CreatableSelect from "react-select/creatable"
import "./css/newworkout.css";
import Header from "../Header"
import { use } from "react"
import {useRef} from "react"

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
    const [newWorkout, setNewWorkout] = useState(location.state?.new || false)
    const[workoutID, setWorkoutID] = useState(location.state?.workout?.WorkoutID || crypto.randomUUID())
    console.log("The workoutID is ", workoutID)
    console.log("Is this a new workout? ", newWorkout)
    console.log("This is editing? ", edit)
    const maxWeeks = location.state?.maxWeeks || location.state?.workout?.plans?.Weeks || null
    const planNumber = location.state?.workout?.plans?.plan_number || null
    const plan = location.state?.workout?.plans || null
    console.log("Max weeks for this plan: ", maxWeeks)
    console.log("This is the workout ", exercise, " and this is the workout name ", workoutName)
    console.log("The workout is: ", workout)
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState(null);
    const og = useRef(exercise);
    const ogName = useRef(workoutName);
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
function generateWorkoutWeeks(thisWeek, maxWeeks) {
  const allWeeks = [];
  let curWeek = location.state?.currentWeek || 1;

  for (let week = location.state?.currentWeek || 1; week <= maxWeeks; week++) {

    const weekExercises = thisWeek.map(ex => {

      let newWeight = ex.weight;

      if (week > curWeek && ex.weight && ex.weight_multiplier) {

        const progressionStep = week - curWeek;

        newWeight = ex.weight * Math.pow(1 + ex.weight_multiplier, progressionStep);

        

        newWeight = Math.round(newWeight / 5) * 5;
}
      return {
        ...ex,
        week: week,
        weight: newWeight
      };
    });

    allWeeks.push(...weekExercises);
  }

  return allWeeks;
}
function buildWorkoutRows(allExercises, workoutName) {

  const grouped = {};

  allExercises.forEach(ex => {

    const weeknum = ex.week;

    if (!grouped[weeknum]) {
        if (newWorkout){
            grouped[weeknum] = {
                Workout_name: workoutName,
                userID: workout?.userID || user.id,
                planID: workout?.plans?.planID || location.state?.planID || null,
                complete: false,
                Notes: null,
                WorkoutID: workoutID,
                week: weeknum,
                Exercise: []
        }
        setNewWorkout(false);
    } else {
        grouped[weeknum] = {
        Workout_name: workoutName,
        userID: workout?.userID || user.id,
        planID: workout?.plans?.planID || null,
        complete: false,
        Notes: null,
        WorkoutID: workoutID,        
        week: weeknum,
        Exercise: []
      };
    }
}

    const { week, ...exerciseData } = ex;

    grouped[weeknum].Exercise.push(exerciseData);

  });

  return Object.values(grouped);
}
const removeExercise = (indexToRemove) => {
    const remove = window.confirm("remove exercise from workout?")
    if(remove){

    setExercise(prev => prev.filter((_, i) => i !== indexToRemove));
}};

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
                                    padding: 0,
                                    fontSize: 16

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
                                    padding: 0,
                                    fontSize: 16
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
                <img src="../images/remove.png" alt="Delete Exercise" className="delete-icon" onClick={() => removeExercise(i)}></img>
                                
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
            navigate("/workouts", { state:{ week: location.state?.currentWeek || 1, planNumber: planNumber, plan: plan } })
             
        }, 1000 )
    }
}
const GoBack = () => {
    navigate("/workouts", { state:{ week: location.state?.currentWeek || 1, planNumber: planNumber, plan: plan } })
}
const deleteWorkout = async () => {
    const sure = window.confirm("Are you sure you want to delete this workout? This cannot be undone.")
    if(!sure) return;
    const { data, error } = await supabase        .from("Workouts")
        .delete()
        .eq("WorkoutID", workoutID);
    if (error) {
        console.error("Delete failed:", error);
    } else {        console.log("Delete successful:", data);
        navigate("/workouts")
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
async function confirmEdit() {
    if(exercise === og.current && workoutName === ogName.current) {
        setEditing(false);
        return
    };
    const sure = window.confirm("Are you finished editing? This will update all workouts for the plans weeks.")
    if (!sure) return;
    const allWeeks = generateWorkoutWeeks(exercise, maxWeeks);
    console.log("All weeks generated for workout: ", allWeeks);
    console.log("type:", typeof allWeeks);
    const rows = buildWorkoutRows(allWeeks, workoutName);
    console.log("Rows to insert into database: ", rows);
    if(newWorkout){
        const { data, error } = await supabase
            .from("Workouts")
            .insert(rows)
            .select();
        if (error) {
            console.error("Insert failed:", error);
        } else {
            console.log("Insert successful:", data);
        }
    } else {
    const { data, error } = await supabase
        .from("Workouts")
        .upsert(rows, { onConflict: "WorkoutID,week" });

        if (error) {
        console.error("Upsert failed:", error);
        } else {
        console.log("Upsert successful:", data);
}

    }
    og.current = exercise;
    ogName.current = workoutName;
    setEditing(false);

}
  
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
                    {editing &&<button className="confirm" onClick={() => confirmEdit()}>Confirm</button>}
                    {!editing && <button className="finish" onClick={() => completeWorkout()}>Lift Finished</button>}
                    {!editing && <button className="GoBack" onClick={() => GoBack()}>Back</button>}
                    {!editing && <button className="delete" onClick={() => deleteWorkout()}>Delete</button>}
        </div>
    

        </div>
    )
}