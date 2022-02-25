import React from 'react'
import { questioncardstyles, questionButton, buttonStyle } from '../QuestionCards.styles';
import {AnswerObject} from '../API'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    // userAnswer: string;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

type ButtonProps = {
    correct: boolean,
    userClicked: boolean
}

function QuestionCard({question,answers,callback,userAnswer,questionNr,totalQuestions}: Props) {
    // console.log(userAnswer)
  return (
    <div style={questioncardstyles}>
        <p style={{fontSize:'1rem'}} className="number">
            Question: {questionNr} / {totalQuestions}
        </p>
        <p style={{fontSize:'1rem'}} dangerouslySetInnerHTML={{__html:question }}/>
        <div>
            {answers.map(answer=>{
                let correct = userAnswer?.correctAnswer===answer;
                let userClicked = userAnswer?.answer === answer
                 return <div style={questionButton} key={answer}>
                    <button onClick={callback} style={{...buttonStyle,background:correct?'linear-gradient(90deg, #56ffa4, #59bc86':!correct && userClicked ?'linear-gradient(90deg,#ff5656,#c16868)':'linear-gradient(90deg,#56ccff,#6eafb4)'}} disabled={userAnswer?true:false} value={answer}>
                    <span dangerouslySetInnerHTML={{__html: answer}}/>
                    </button>
                    {/* 'linear-gradient(90deg,#56ccff,#6eafb4)'//blue */}
                    {/* 'linear-gradient(90deg, #56ffa4, #59bc86' // green */}
                    {/* 'linear-gradient(90deg,#ff5656,#c16868)' // red */}
                </div>
            })}
        </div>
    </div>
  )
}

export default QuestionCard