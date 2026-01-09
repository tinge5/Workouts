import logo from './logo.svg'
import { Routes, useNavigate, Route } from "react-router-dom";
import './App.css'
import Home from './Pages/Home.jsx';
import Plans from './Plans.jsx';
import { useEffect, useState } from 'react';
import { supabase } from './config/supabaseClient'; // Adjust path if needed
function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plans" element={<Plans />} />
    </Routes>
  
    
  )
}

export default App
