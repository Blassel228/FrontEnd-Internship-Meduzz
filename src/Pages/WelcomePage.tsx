import React, {useEffect, useState} from 'react';
import './WelcomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { setGoodbyeMessage } from '../Store/slices/testStringSlice';
import { RootState } from '../Store/store';
import checkHealth from "../Api/apiEndpoints";
import LogoutButton from "../Compponents/LogoutButton";
import { useAuth0 } from '@auth0/auth0-react';

const WelcomePage = () => {
  const dispatch = useDispatch();
  const projectName = "Internship";
  const greeting = useSelector((state: RootState) => state.greeting);
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const {isAuthenticated} = useAuth0();

  const handlePopState = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setGoodbyeMessage());
    await sleep(1000);
    window.history.back();
  };

  useEffect(() => {
    const checkServerHealth = async () => {
      const health = await checkHealth();
      setIsHealthy(health);
    };

    checkServerHealth();
  }, []);

  return (
    <div className="welcome-container">
      <LogoutButton/>
      <header className="welcome-header">
        <h1 onClick={() => console.log("H1 was clicked")}>{projectName}</h1>
        <div>Authenticated: {(isAuthenticated || localStorage.getItem("authToken")) ? 'Yes' : 'No'}</div>
        <p>{greeting.message}</p>
        <p>
          Health Status: {isHealthy === null ? "Loading..." : isHealthy ? "Healthy" : "Unhealthy"}
        </p>
        <button onClick={handlePopState} style={{ border: 'none', width: '200px', height: "40px", fontSize: "20px" }}>
          Bye
        </button>
        <button onClick={checkHealth} style={{ border: 'none', width: '200px', height: "40px", fontSize: "20px",
          marginTop: "20px" }}>
          Health Check
        </button>

      </header>
    </div>
  );
};

export default WelcomePage;
