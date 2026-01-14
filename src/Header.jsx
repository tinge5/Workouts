import { useState, useEffect } from "react";
import { supabase } from "./config/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
      async function checkAuth() {
        const {data, error} = await supabase.auth.getSession();
        if (data.session) {
          setUser(data.session.user);
          console.log("User is authenticated:", data.session.user);
          return;
        }
        console.error(error);
  
      }
      checkAuth();
    }, []);
  
  
  return (
    <div className="header">
      <img src="../images/workoutslogo.svg" alt="Logo" className="logo" />
      {user ? <img src="../images/Profile.svg" alt="Profile" className="profile-logo" onClick={() => navigate('/profile')}/> : null}
    </div>
  );
}
