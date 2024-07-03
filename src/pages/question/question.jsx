import React, { useEffect, useState } from 'react';
import Api from '../../service/Api';

const Question = ({ difficulty }) => {

  const [actualQuestion, setActualQuestion] = useState({})
  const [questionsList, setQuestionsList] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
 
  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await Api.getQuestions(difficulty)
        console.log(response.data)
        setQuestionsList(response.data)

        setActualQuestion(response.data[0])
        console.log(actualQuestion)
      } catch (error) {
        console.error(error)
      }
    }
    getQuestion()
  }, [difficulty])


  const nextQuestion = () => {
    const newIndex = questionIndex + 1;
    if (questionsList.length > newIndex) {
      setQuestionIndex(newIndex);
      setActualQuestion(questionsList[newIndex]);
    } else {
      setShowModal(true);
    }
  }

  const answer = async (selectedAnswer) => {
    const response = await Api.postAnswer({questionId: actualQuestion.id, option: selectedAnswer})
    nextQuestion()
  }

  if (!actualQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Question</h1>
      <div>
        <p>{actualQuestion.question}</p>
        <button onClick={() => answer("option1")}>{actualQuestion.option1}</button>
        <button onClick={() => answer("option2")}>{actualQuestion.option2}</button>
        <button onClick={() => answer("option3")}>{actualQuestion.option3}</button>
        <button onClick={() => answer("option4")}>{actualQuestion.option4}</button>
      </div>
      {showModal && <div>No more questions available.</div>}
    </div>
  );
}

export default Question;
