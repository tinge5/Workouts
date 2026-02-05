import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {supabase} from '../config/supabaseClient.js';

import { useEffect } from 'react';
import './css/StartScreen.css';
export function useRStatus() {
    const [user, setUser] = useState(null);
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
  return user;
}
export default function StartScreen() {
  const navigate = useNavigate();
  const IsUser = useRStatus();



  return (
    <div className='screen'>
      <img src ="/images/workoutslogo.svg" alt="Workouts Logo" className="workouts-logo"></img>
      {IsUser ? (
        <button className='buttons1' onClick={() => navigate('/plans')}>Home</button>
      ) : <button className='buttons1' onClick={() => navigate('/auth')}>Sign in</button>     
}
    </div>
  );
}