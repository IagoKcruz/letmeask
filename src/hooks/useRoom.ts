import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"
type firebaseQuestions = Record<string, {
    author: {
        id: string,
        name: string,
        avatar: string
    },
    content: string,
    isHighLighted: boolean,
    isAnswered: boolean,
    likes: Record<string, {
        authorId: string
    }>
}>
type QuestionType = {
    id: string,
    author: {
        id:string,
        name: string,
        avatar: string
    },
    content: string,
    isHighLighted: boolean,
    isAnswered: boolean
    likeCount:number, 
    likeId: string | undefined
}
export function useRoom(roomId: string) {
    const { user } = useAuth()
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
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            })
            setTitle(databaseRoom.title)
            setQuestion(parsedQuestion)
        })

        return () => {
            roomRef.off("value")
        }
    }, [roomId, user?.id])

    return { questions, title }

}

