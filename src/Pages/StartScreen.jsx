
import { useNavigate } from 'react-router-dom';
import './css/StartScreen.css';
export default function StartScreen() {
  const navigate = useNavigate();

  return (
    <div className='screen'>
      <img src ="../public/images/workoutslogo.svg" alt="Workouts Logo" className="workouts-logo"></img>
      <button className="buttons" onClick={() => navigate('/auth')}>Sign in</button>     
    </div>
  );
}