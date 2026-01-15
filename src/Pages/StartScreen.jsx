import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {supabase} from '../config/supabaseClient.js';
import workoutslogo from '../public/images/workoutslogo.svg';

import { useEffect } from 'react';
import './css/StartScreen.css';
export default function StartScreen() {
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
    <div className='screen'>
      <img src ={workoutslogo} alt="Workouts Logo" className="workouts-logo"></img>
      {user ? (
        <button className="buttons" onClick={() => navigate('/plans')}>Home</button>
      ) : <button className="buttons" onClick={() => navigate('/auth')}>Sign in</button>     
}
    </div>
  );
}