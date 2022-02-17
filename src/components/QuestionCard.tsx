import React from 'react'
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

function QuestionCard({question,answers,callback,userAnswer,questionNr,totalQuestions}: Props) {
    // console.log(userAnswer)
  return (
    <div>
        <p className="number">
            Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html:question }}/>
        <div>
            {answers.map(answer=>{
                return <div key={answer}>
                    <button value={answer} disabled={userAnswer?true:false} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html: answer}}/>
                    </button>
                </div>
            })}
        </div>
    </div>
  )
}

export default QuestionCard