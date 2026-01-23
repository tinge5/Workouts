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
                        Plan Name
                        <input
                            type="text"
                            placeholder=""
                            />
                        
                        </div>

                    <div className="planning">
                    pick something 
                    <select
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        >
                        <option value="">Choose a workout</option>
                        <option value="push">Push</option>
                        <option value="pull">Pull</option>
                        <option value="legs">Legs</option>
                        </select>
                        
                    </div>
                </div>

            </div>
        )
}