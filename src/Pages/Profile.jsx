import Header from '../Header.jsx';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useRStatus } from "./StartScreen"
import { useEffect } from 'react';
import { useState } from 'react';
import './css/Auth.css';
export default function Profile() {
    const user = useRStatus()
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const signout = async () => {
        await supabase.auth.signOut();
        console.log("User signed out");
        navigate('/');
    }
useEffect(() => {
  const fetchUsername = async () => {
    if (!user) {
      console.log("no user logged in");
      return;
    }

    const { data, error } = await supabase
      .from("UserAccounts")
      .select("username")
      .eq("id", user.id)
      .single();

    if (data) {
      console.log("This is", data.username,"'s account");
      setUsername(data.username);
    }

    if (error) {
      console.log(error);
    }
  };

  fetchUsername();
}, [user]);
async function updateUsername(name){
        if(!user){
            console.log("no user logged in")
            return
        }
        const {data, error} = await supabase
          .from("UserAccounts")
          .update({username: name})
          .eq("id", user.id)
          .select()
          .single()
        if(data){
          console.log("Updated username to", data.username,"'s account")
        }
        if(error){
          console.log(error)
        }
    }
  return (
    <div className="screen">
        <Header />
      <h1 style={{ color: "white", textAlign: "center" }}>Profile Page</h1>
      <p>Chang username or sign out</p>
      <div style={{gap:"10px", display:"flex", flexDirection:"row", alignItems:"center", marginBottom:"10px"}}>
        <input type="text" placeholder={username} onChange={(e) => setName(e.target.value)}></input>
        <button className="buttons" onClick={() => updateUsername(name)}>Update</button>
      </div>
      <button className="buttons" onClick={signout}>Sign Out</button>
    </div>
  );
}
