import React, { useEffect, useState } from 'react';
import Api from '../../service/Api';
import GameModal from '../../components/gameModal';

const Question = ({ difficulty, goHome }) => {
  
  const [actualQuestion, setActualQuestion] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});
  const [score, setScore] = useState(0);
  const options = ['option1', 'option2', 'option3', 'option4'];

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await Api.getQuestions(difficulty)
        setQuestionsList(response.data)
        setActualQuestion(response.data[0])
      } catch (error) {
        setModalConfig({
          title: `An error ocurred. Please try again later`,
        })
        setShowModal(true)
      }
    }
    getQuestion()
  }, [difficulty])

  const handleSelectedAnswer = async (option) => {
    const response = await Api.postAnswer({ questionId: actualQuestion.id, option })
    if (response.data.answer) {
      setScore(score + 1)
    }
    setModalConfig({
      title: `The answer is: ${response.data.answer ? 'Correct' : 'Incorrect'}`,
      handleClose: handleCloseAnswerModal,
      correctAnswer: response.data.answer,
    })
    setShowModal(true)
  }

  const handleCloseAnswerModal = () => {
    setShowModal(false)
    nextQuestion()
  }

  const handleCloseEndModal = () => {
    goHome()
    setShowModal(false)
  };

  const nextQuestion = () => {
    const newIndex = questionIndex + 1
    if (questionsList.length > newIndex) {
      setQuestionIndex(newIndex)
      setActualQuestion(questionsList[newIndex])
    } else {
      setModalConfig({
        title: 'Game Over',
        handleClose: handleCloseEndModal,
        isGameOver: true,
        score,
      });
      setShowModal(true)
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
        {options.map((option) => (
          <button key={option} onClick={() => handleSelectedAnswer(option)}>
            {actualQuestion[option]}
          </button>
        ))}
      </div>
      <h3>Score: {score}/{questionsList.length}</h3>
      <GameModal
        show={showModal}
        {...modalConfig}
      />
    </div>
  );
};

export default Question;
