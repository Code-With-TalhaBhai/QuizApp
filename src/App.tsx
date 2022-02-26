import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions, QuestionState, AnswerObject } from './API';

function App() {
      // const [choice, setChoice] = useState<userQuery[]>([]);
    const [category, setCategory] = useState('');
    const [startBtn, setStartBtn] = useState(true);
    const [stBtn,setStBtn] = useState(false)
    const [totalQA, setTotalQA] = useState(10);
    const [difficulty, setDifficulty] = useState('easy');
    const  [form, setForm] = useState(false);
     const [loading, setLoading] = useState(false);
     const [questions, setQuestions] = useState<QuestionState[]>([])
     const [number, setNumber] = useState(0)
     const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
     const [score, setScore] = useState(0)
     const [gameOver, setGameOver] = useState(true);

     const difficult = [
      {label:'Easy',valued:'easy'},
      {label:'Medium',valued:'medium'},
      {label:'Hard',valued:'hard'}
     ]

     const categories = [
       {label:'All Categories',value:''},
       {label:'General Knowledge',value:'10'},
       {label:'Entertainment: Books',value:'11'},
       {label:'Entertainment: Film',value:'12'},
       {label:'Entertainment: Music',value:'12'},
       {label:'Entertainment: Musical & Theaters',value:'12'},
       {label:'Entertainment: Television',value:'15'},
       {label:'Entertainment: Video Games',value:'16'},
       {label:'Entertainment: Board Games',value:'17'},
       {label:'Science & Nature',value:'18'},
       {label:'Science: Computer',value:'19'},
       {label:'Science: Mathematics',value:'20'},
       {label:'Mythology',value:'21'},
       {label:'Sports',value:'22'},
       {label:'Geography',value:'23'},
       {label:'History',value:'24'},
       {label:'Politics',value:'25'},
       {label:'Art',value:'26'},
       {label:'Celebrities',value:'27'},
       {label:'Animals',value:'28'},
       {label:'Vehicles',value:'29'},
       {label:'Entertainment: Comics',value:'30'},
       {label:'Science: Gadgets',value:'31'},
       {label:'Entertainment: Japanese Anime & Manga',value:'32'},
       {label:'Entertainment: Cartoon & Animations',value:'33'}
     ]


     const TotalQuestions = ()=>{
       return totalQA
      }

      const startForm = () => {
        setForm(true);
        setStartBtn(false);
        setStBtn(!stBtn)
        // setGameOver(false);
        setUserAnswers([]);
      }

      const startTrivia = async () => {
        setLoading(true);
        setForm(false);
        setGameOver(false);
        const newQuestions = await fetchQuizQuestions(difficulty,category,TotalQuestions())
        setQuestions(newQuestions)
        setScore(0)
        // setUserAnswers([]);
        setNumber(0);
        setLoading(false);
        // setForm(true)
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
      <h1>REACT QUIZ BY TALHA</h1>
      {/* {gameOver || userAnswers.length === TotalQuestions()?( */}
      {/* {!form || userAnswers.length === TotalQuestions()?( */}
      {/* {(startBtn && userAnswers.length === TotalQuestions()) || userAnswers.length <= 0 ?( */}
      {/* {startBtn || userAnswers.length === TotalQuestions()?( */}
      {/* {(userAnswers.length === TotalQuestions() && stBtn) || startBtn?( */}
      {userAnswers.length === TotalQuestions() || startBtn?(
      <button className='start' onClick={startForm}>Start</button>)
      :null
      }

      {/* {gameOver || userAnswers.length === TotalQuestions()? */}
      {form?
      <form className="queries" onSubmit={startTrivia}>
      {/* // <form className="queries"> */}
      <h3>Number of Questions:</h3>
      <input type="number" name='numQuestions' className='inputquery' onChange={(e)=>setTotalQA(parseInt(e.target.value))} value={totalQA} min={1} max={50} required/>
      <h3>Select Category:</h3>
      <select id="categories" name="categories" className='inputquery' value={category} onChange={(e)=>{setCategory(e.target.value)}}>
        {categories.map((element,index)=>(
        <option value={(Number(element.value)-1).toString()}>{element.label}</option>
        ))}
      </select>
      <h3>Select Difficulty:</h3>
      <select id="difficulty" name="difficulty" className='inputquery' value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
        {difficult.map((element,index)=>(
        <option value={element.valued}>{element.label}</option>
        ))}
      </select>
      {/* <button className="user" onClick={nextQuestion}>Submit</button> */}
      {
      // gameOver || userAnswers.length === TotalQuestions()?(
      <button type='submit' className='start'>Start Now</button>
      // ):null
      }
      </form>:null}

      {!form && !gameOver?(<p className='score'>Score:{score}</p>):null}
      {loading?(<p>Loading Questions ...</p>):null}
      {!form && !loading && !gameOver &&(
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
        {!form && !gameOver && !loading && number !== TotalQuestions()-1 && userAnswers.length === number+1 ?(
      <button className="next" onClick={nextQuestion}>Next Question</button>
        ):null}
    </div>
  );
}

// https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple

export default App;
