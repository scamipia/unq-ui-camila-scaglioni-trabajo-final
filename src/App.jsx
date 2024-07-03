import React, { useState } from 'react';
import Home from './pages/home/home';
import Question from './pages/question/question';

function App() {
  const [view, setView] = useState('home');
  const [difficulty, setDifficulty] = useState('easy');

  const goToQuestion = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setView('question');
  }
    

  return (
    <div className="App">
      <div className="container-fluid">
        {view === 'home' && <Home goToQuestion={goToQuestion} />}
        {view === 'question' && <Question />}
      </div>
    </div>
  );
}

export default App;