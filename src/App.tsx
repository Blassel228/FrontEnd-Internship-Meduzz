import React from 'react';
import './App.css';

const App: React.FC = () => {
  const projectName = "Internship";
  const greeting = "Welcome to my project!";

  return (
    <div className="App">
      <header className="App-header">
        <h1>{projectName}</h1>
        <p>{greeting}</p>
      </header>
    </div>
  );
}

export default App;