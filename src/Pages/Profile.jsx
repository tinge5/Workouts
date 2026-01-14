import Header from '../Header.jsx';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
export default function Profile() {
    const navigate = useNavigate();
    const signout = async () => {
        await supabase.auth.signOut();
        console.log("User signed out");
        navigate('/');
    }
  return (
    <div className="screen">
        <Header />
      <h1 style={{ color: "white", textAlign: "center" }}>Profile Page</h1>
      <p>This is the profile page of the application.</p>
      <button className="buttons" onClick={signout}>Sign Out</button>
    </div>
  );
}