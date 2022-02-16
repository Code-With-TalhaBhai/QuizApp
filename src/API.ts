import { shuffleArray } from "./shuffle"

export type Question = {
    category:string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export type QuestionState = Question & { answers: string[]}
export type AnswerObject = {
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string
}


export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export enum Category {
    AnyCat= 9,GenKnow,Books,Film,Music,Theatre,TV,Bgame,SciNat,SciCom,SciMath,Sports,GeoGraphy,History,Politics,Art,Celebrities,Animals,Vehicles,Comics,Gadgets,JapAnima,Catoon
}

// enum Category

export const fetchQuizQuestions = async(amount:number, difficulty:Difficulty)=>{
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endpoint)).json()
    // console.log(data)
    return data.results.map((question:Question)=>(
        {
        ...question,
        answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer
        ])
        }
        ))
}