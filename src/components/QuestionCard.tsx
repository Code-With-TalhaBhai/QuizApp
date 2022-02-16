import React from 'react'

type Props = {
    question: string;
    answers: string[];
    callback: any;
    // userAnswer: string;
    userAnswer: any;
    questionNr: number;
    totalQuestions: number;
}

function QuestionCard({question,answers,callback,userAnswer,questionNr,totalQuestions}: Props) {
  return (
    <div>
        <p className="number">
            Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html:question }}/>
        <div>
            {answers.map(answer=>{
                <div>
                    <button disabled={userAnswer} onClick={callback}/>
                    <span dangerouslySetInnerHTML={{__html:answer}}/>
                </div>
            })}
        </div>
    </div>
  )
}

export default QuestionCard