import {supabase} from '../config/supabaseClient.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header.jsx';
import './css/Auth.css';



export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  const signup = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        })

        if (error) {
          console.error(error.message)
        } else {
          console.log("User signed up:", data)
        }
        const {error: dbError} = await supabase
          .from('UserAccounts')
          .insert([
            {email: email,
             id: data.user.id
            }
          ])
          if (dbError) {
              console.error(dbError)
              return;
          }
          console.log("User account created in database:", data.user.id);
          navigate('/plans');
          
      }
  return (
    <div className='screen'>
      <Header />
      <h1>Auth Page</h1>
      <p>This is the authentication page of the application. and where you wil create stuff bla bla</p>
      <input className='input-field'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input className='input-field'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => signup(email, password)}>Sign Up</button>
    </div>
  )
}
