import React from 'react';
import './WelcomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { setGoodbyeMessage } from '../Store/slices/testStringSlice';
import { RootState } from '../Store/store';

const WelcomePage = () => {
  const dispatch = useDispatch();
  const projectName = "Internship";
   const greeting = useSelector((state: RootState) => state.greeting);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handlePopState = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      dispatch(setGoodbyeMessage());
      await sleep(1000);
      window.history.back();
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1 onClick={() => console.log("H1 was clicked")}>{projectName}</h1>
        <p>{greeting}</p>
        <button onClick={handlePopState} style={{ border: 'none', width: '200px', height: "40px", fontSize: "20px" }}>
          Bye
        </button>
      </header>
    </div>
  );
};

export default WelcomePage;
