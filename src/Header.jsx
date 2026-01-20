import { supabase } from "./config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useRStatus } from "./Pages/StartScreen";
export default function Header() {
  const navigate = useNavigate();
  const user1 = useRStatus();
  return (
    <div className="header">
      <img src="../images/workoutslogo.svg" alt="Logo" className="logo" onClick={() => navigate('/plans')}/>
      {user1 ? <img src="../images/Profile.svg" alt="Profile" className="profile-logo" onClick={() => navigate('/profile')}/> : null}
    </div>
  );
}
