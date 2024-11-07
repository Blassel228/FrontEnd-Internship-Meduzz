import React from 'react';
import './WelcomePage.css';

const WelcomePage = () => {
  const projectName = "Internship";
  const greeting = "Welcome to my project!";

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>{projectName}</h1>
        <p>{greeting}</p>
      </header>
    </div>
  );
}

export default WelcomePage;