import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionCard from './components/QuestionCard';
import { Difficulty, fetchQuizQuestions, QuestionState, AnswerObject } from './API';

function App() {
     const [loading, setLoading] = useState(false);
     const [questions, setQuestions] = useState<QuestionState[]>([])
     const [number, setNumber] = useState(0)
     const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
     const [score, setScore] = useState(0)
     const [gameOver, setGameOver] = useState(true)

     
     const TotalQuestions = ()=>{
       return 10
      }
      const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);
        const newQuestions = await fetchQuizQuestions(TotalQuestions(),Difficulty.MEDIUM)
        setQuestions(newQuestions)
        setScore(0)
        setUserAnswers([]);
        setNumber(0);
        setLoading(false)
      }
      console.log(questions)
      const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!gameOver){
          // Getting user answer value
          const answer = e.currentTarget.value
          // Check answer boolean
          const correct = questions[number].correct_answer === answer;
          const answerObject = {
            question: questions[number].question,
            answer,
            correct,
            correctAnswer: questions[number].correct_answer
          }
          setUserAnswers((prev)=>[...prev,answerObject])
          if(correct){
            setScore((prev)=>prev+1)
          }
          console.log(userAnswers)
        }
      }
      const nextQuestion = ()=> {
        const nextQuestion = number+1;
        if(nextQuestion === TotalQuestions()){
          setGameOver(true)
        }else{
          setNumber(nextQuestion)
        }
      }
      // console.log(fetchQuizQuestions(TotalQuestions(),Difficulty.MEDIUM))

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TotalQuestions()?(
      <button className='start' onClick={startTrivia}>Start</button>)
      :null
      }
      {!gameOver?(<p className='score'>Score:{score}</p>):null}
      {loading?(<p>Loading Questions ...</p>):null}
      {!loading && !gameOver &&(
      <QuestionCard
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers?userAnswers[number]:undefined}
      questionNr={number+1}
      totalQuestions={TotalQuestions()}
      callback={checkAnswer}
      />
      )
      }
        {!gameOver && !loading && number !== TotalQuestions()-1 && userAnswers.length === number+1 ?(
      <button className="next" onClick={nextQuestion}>Next Question</button>
        ):null}
    </div>
  );
}

// https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple

export default App;
