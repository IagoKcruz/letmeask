import { useEffect, useState } from "react"
import { database } from "../services/firebase"

type firebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighLighted: boolean,
    isAnswered: boolean
}>
type QuestionType = {
    id: string,
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighLighted: boolean,
    isAnswered: boolean
}
export function useRoom(roomId: string) {
    const [title, setTitle] = useState('')
    const [questions, setQuestion] = useState<QuestionType[]>([])

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)
        roomRef.on("value", room => {
            const databaseRoom = room.val()
            const firebaseQuestions = databaseRoom.questions as firebaseQuestions
            const parsedQuestion = Object.entries(firebaseQuestions ?? {}).map(([key, value]) => {

                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title)
            setQuestion(parsedQuestion)
        })
    }, [roomId])

    return {questions, title}

}