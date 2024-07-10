import Api from '../../service/Api';
import { useState, useEffect} from 'react'
import './home.css'; 
import GameModal from '../../components/gameModal';

function Home({ goToQuestion }) {
  const [difficultyOptions, setDifficultyOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState('easy');
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchOptions = async () => {
        try {
          const response = await Api.getDifficulty()
          setDifficultyOptions(response.data)
        } catch (error) {
            setShowModal(true)
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
      <GameModal
        show={showModal}
        title={'There was a problem. Try again later'}
        handleClose={() => {}}
      /> 
    </div>
  );
}

export default Home;