// import React, { useEffect, useState } from 'react';
// import Api from '../../service/Api';
// import AnswerModal from '../../components/answerModal';

// const Question = ({ difficulty }) => {

//   const [actualQuestion, setActualQuestion] = useState({})
//   const [questionsList, setQuestionsList] = useState([])
//   const [questionIndex, setQuestionIndex] = useState(0)
//   const [showModal, setShowModal] = useState(false)
//   const [showAnswerModal, setShowAnswerModal] = useState(false)
//   const [answer, setAnswer] = useState('')
 
//   useEffect(() => {
//     const getQuestion = async () => {
//       try {
//         const response = await Api.getQuestions(difficulty)
//         setQuestionsList(response.data)
//         setActualQuestion(response.data[0])
//       } catch (error) {
//         console.error(error)
//       }
//     }
//     getQuestion()
//   }, [difficulty])

//   useEffect(() => {
//     if (answer) {
//       console.log('Updated answer:', answer);
//     }
//   }, [answer]);


//   const nextQuestion = () => {
//     const newIndex = questionIndex + 1;
//     if (questionsList.length > newIndex) {
//       setQuestionIndex(newIndex);
//       setActualQuestion(questionsList[newIndex]);
//     } else {
//       setShowModal(true);
//     }
//   }

//   const postAnswer = async (selectedAnswer) => {
//     const response = await Api.postAnswer({questionId: actualQuestion.id, option: selectedAnswer})
//     console.log('API response:', response.data.answer);
//     setAnswer(response.data.answer)
//     console.log(answer)
//     setShowAnswerModal(true)
//   }

  

//   const handleCloseModal = () => {
//     setShowAnswerModal(false)
//     nextQuestion()
//   }

//   if (!actualQuestion) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Question</h1>
//       <div>
//         <p>{actualQuestion.question}</p>
//         <button onClick={() => postAnswer("option1")}>{actualQuestion.option1}</button>
//         <button onClick={() => postAnswer("option2")}>{actualQuestion.option2}</button>
//         <button onClick={() => postAnswer("option3")}>{actualQuestion.option3}</button>
//         <button onClick={() => postAnswer("option4")}>{actualQuestion.option4}</button>
//       </div>
//       {showModal && <div>No more questions available.</div>}
//       <AnswerModal
//             show={showAnswerModal}
//             title={answer}
//             handleClose={handleCloseModal}
//         />
//     </div>
//   );
// }

// export default Question;

import React, { useEffect, useState } from 'react';
import Api from '../../service/Api';
import AnswerModal from '../../components/answerModal';

const Question = ({ difficulty }) => {

  const [actualQuestion, setActualQuestion] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [answer,setAnswer] = useState(null)

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
    // if(answer){
    //   postAnswer()
    // }
  }, [answer])

  const postAnswer = () => {
    console.log("postAnswer", answer)
  }

  const nextQuestion = () => {
    const newIndex = questionIndex + 1;
    if (questionsList.length > newIndex) {
      setQuestionIndex(newIndex)
      setActualQuestion(questionsList[newIndex])
    } else {
      setShowModal(true)
    }
  };

  const handleSelectedAnswer = async (option) => {
    const response = await Api.postAnswer({ questionId: actualQuestion.id, option: option });
    setAnswer(response.data.answer)
    setShowAnswerModal(true)
  }

  const handleCloseModal = () => {
    setShowAnswerModal(false)
    nextQuestion()
  }

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
      {showModal && <div>No more questions available.</div>}
         <AnswerModal
          show={showAnswerModal}
          title={`The answer is: ${answer ? 'Correct' : 'Incorrect'}`}
          handleClose={handleCloseModal}
        /> 

    </div>
  );
}

export default Question;
