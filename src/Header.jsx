import { supabase } from "./config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useRStatus } from "./Pages/StartScreen";
import { useEffect } from "react";
import { useState } from "react";
export default function Header() {
  const navigate = useNavigate();
  const user1 = useRStatus();
  const [username, setUsername] = useState(null);
useEffect(() => {
  async function retrieveName(){
      if (!user1){
        console.log("error no user")
        return
      }

    const {data, error} = await supabase
      .from('UserAccounts')
      .select("username")
      .eq("id", user1.id)
      .single()
    if(error){
      console.log(error)
    }
    if(data){
      console.log(data)
      setUsername(data.username)
    }
    
  }
  retrieveName()
}, [user1]);
  

  return (
    <div className="header" style={{marginBottom: "10px"}}>
      <img src="../images/workoutslogo.svg" alt="Logo" className="logo" onClick={() => navigate('/plans')}/>
      <h2 style={{color: "white"}} className="profile-name">{ username ? username : ""}</h2>
      {user1 ? <img src="../images/Profile.svg" alt="Profile" className="profile-logo" onClick={() => navigate('/profile')}/> : null}
    </div>
  );
}
