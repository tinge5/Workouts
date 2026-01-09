
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to the Home Page</h1>

      <p>
        This is the home page of the application.
    </p>
    <button onClick={() => navigate('/plans')}>Go to Plans</button>
    </div>
    
  );
}