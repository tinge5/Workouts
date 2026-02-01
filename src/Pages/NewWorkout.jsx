import { supabase } from "../config/supabaseClient"
import { useEffect, useState } from "react"
import { useRStatus } from "./StartScreen"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import CreatableSelect from "react-select/creatable"
import "./css/newworkout.css";
import Header from "../Header"

export default function NewWorkout(){

    return (
        <div className="screen">
        <Header />
                <h1>New Workout</h1>
                <div className="plan-card">
                </div>
        </div>
    )
}