
import { useNavigate } from 'react-router-dom';
import './css/Home.css';
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='screen'>
      <img src ="../public/images/workoutslogo.svg" alt="Workouts Logo" className="workouts-logo"></img>
      <button className="buttons" onClick={() => navigate('/plans')}>Sign in</button>     
    </div>
  );
}