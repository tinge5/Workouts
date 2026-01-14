import logo from './logo.svg'
import { Routes, useNavigate, Route } from "react-router-dom";
import './App.css'
import StartScreen from './Pages/StartScreen.jsx';
import Plans from './Pages/Plans.jsx';
import BodyBackgroundController from './BodyClassController.jsx';
import { useEffect, useState } from 'react';
import { supabase } from './config/supabaseClient'; // Adjust path if needed
import { useLocation } from 'react-router-dom';
import { use } from 'react';
import Auth from './Pages/Auth.jsx';
function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  return (
   <>
    <BodyBackgroundController />
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
    </>
    
  )
}

export default App
