import { supabase } from "./config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useRStatus } from "./Pages/StartScreen";
export default function Header() {
  const navigate = useNavigate();
  const user1 = useRStatus();
  return (
    <div className="header">
      <img src="../images/workoutslogo.svg" alt="Logo" className="logo" onClick={() => navigate('/plans')}/>
      <p style={{color: "white"}} className="profile-name">{user1 ? user1.email : 'u'}</p>
      {user1 ? <img src="../images/Profile.svg" alt="Profile" className="profile-logo" onClick={() => navigate('/profile')}/> : null}
    </div>
  );
}
