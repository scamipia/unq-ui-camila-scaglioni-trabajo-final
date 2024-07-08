import Api from '../../service/Api';
import { useState, useEffect} from 'react'
import './home.css'; 

function Home({ goToQuestion }) {
  const [difficultyOptions, setDifficultyOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState('easy');

  useEffect(() => {
    const fetchOptions = async () => {
        try {
          const response = await Api.getDifficulty()
          setDifficultyOptions(response.data)
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };
    fetchOptions();
  }, []);

  const handleDifficultyClick = (difficulty) => {
      setSelectedOption(difficulty);
  }

  const startGame = async () => {
    goToQuestion(selectedOption)
  }

  return (
    <div>
      <h1>
        Welcome to Preguntados Clone!
      </h1>
      <div className="difficulties-container">
        <div className="difficulty">
          {difficultyOptions.map(option => (
            <button 
              key={option} 
              onClick={() => handleDifficultyClick(option)}
              className={option === selectedOption ? 'button button-selected' : 'button'}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <button className='start-button' onClick={startGame}>
        Start Game
      </button>
    </div>
  );
}

export default Home;