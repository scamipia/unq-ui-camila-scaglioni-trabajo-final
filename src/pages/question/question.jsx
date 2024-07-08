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

  useEffect(() => {
    setAnswer(answer)
  }, [answer])

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
        <button onClick={() => handleSelectedAnswer("option1")}>{actualQuestion.option1}</button>
        <button onClick={() => handleSelectedAnswer("option2")}>{actualQuestion.option2}</button>
        <button onClick={() => handleSelectedAnswer("option3")}>{actualQuestion.option3}</button>
        <button onClick={() => handleSelectedAnswer("option4")}>{actualQuestion.option4}</button>
      </div>
      <p>{score}/{questionsList.length}</p>
      <GameModal
        show={showEndModal}
        title={'Game Over'}
        handleClose={handleCloseEndModal}
        isGameOver={true}
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
