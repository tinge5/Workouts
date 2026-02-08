import { supabase } from "../config/supabaseClient"
import { useEffect, useState } from "react"
import { useRStatus } from "./StartScreen"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import CreatableSelect from "react-select/creatable"
import "./css/newworkout.css";
import Header from "../Header"

export default function NewWorkout(){
    const user = useRStatus();
    const location = useLocation();
    const navigate = useNavigate();
    const editing = location.state?.workout ? true : false
    console.log("Location state in NewWorkout:", location.state);
    console.log("This is editing? ", editing)
    const maxWeeks = location.state?.maxWeeks || location.state?.workout?.plans?.Weeks || null
    console.log("Max weeks for this plan: ", maxWeeks)

    return (
        <div className="screen">
        <Header />
                <h1>New Workout</h1>
                <div className="plan-card">
                </div>
        </div>
    )
}