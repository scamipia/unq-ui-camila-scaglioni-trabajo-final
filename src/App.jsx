import React, { useState } from 'react';
import Home from './pages/home/home';
import Question from './pages/question/question';
import './App.css';

function App() {
  const [view, setView] = useState('home');
  const [difficulty, setDifficulty] = useState('easy');

  const goToQuestion = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setView('question');
  }

  const goHome = () => {
    setView('home');
  }
    

  return (
    <div className="App">
      <div className="container">
        {view === 'home' && <Home goToQuestion={goToQuestion} />}
        {view === 'question' && <Question difficulty={difficulty} goHome={goHome} />}
      </div>
    </div>
  );
}

export default App;