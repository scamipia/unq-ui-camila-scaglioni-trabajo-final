import React, { useEffect, useState } from 'react';
import Api from '../../service/Api';
import GameModal from '../../components/gameModal';

const Question = ({ difficulty, goHome }) => {

  const [actualQuestion, setActualQuestion] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [answer,setAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const options = ['option1', 'option2', 'option3', 'option4'];


  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await Api.getQuestions(difficulty)
        setQuestionsList(response.data);
        setActualQuestion(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    getQuestion()
  }, [difficulty])

  const handleSelectedAnswer = async (option) => {
    const response = await Api.postAnswer({ questionId: actualQuestion.id, option: option });
    setAnswer(response.data.answer)
    if(response.data.answer) {
      setScore(score + 1)
    }
    setShowAnswerModal(true)
  }

  const handleCloseAnswerModal = () => {
    setShowAnswerModal(false)
    nextQuestion()
  }

  const handleCloseEndModal = () => {
    goHome()
    setShowEndModal(false)
  }

  const nextQuestion = () => {
    const newIndex = questionIndex + 1;
    if (questionsList.length > newIndex) {
      setQuestionIndex(newIndex)
      setActualQuestion(questionsList[newIndex])
    } else {
      setShowEndModal(true)
    }
  };

  if (!actualQuestion) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Question</h1>
      <div>
        <p>{actualQuestion.question}</p>
          {options.map(option => (
            <button key={option} onClick={() => handleSelectedAnswer(option)}>
              {actualQuestion[option]}
            </button>
          ))}
      </div>
      <h3>Score: {score}/{questionsList.length}</h3>
      <GameModal
        show={showEndModal}
        title={'Game Over'}
        handleClose={handleCloseEndModal}
        isGameOver={true}
        score={score}
      />
      <GameModal
        show={showAnswerModal}
        title={`The answer is: ${answer ? 'Correct' : 'Incorrect'}`}
        handleClose={handleCloseAnswerModal}
        correctAnswer={answer}
      /> 

    </div>
  );
}

export default Question;
