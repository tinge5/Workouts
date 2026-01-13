
import { useNavigate } from 'react-router-dom';
import './css/Home.css';
export default function Home() {
  const navigate = useNavigate();
  return (
    <img src ="../public/images/workoutslogo.svg" alt="Workouts Logo" className="workouts-logo" onClick={() => navigate('/plans')} />
  );
}