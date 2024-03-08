import { useParams } from "react-router-dom"
import logoImg from "../assets/logo.svg"
import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { FormEvent, useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "../hooks/useAuth"
type RoomParams = {
  id: string
}
type firebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isHighLighted: boolean,
  isAnswered: boolean
}>
type Question = {
  id: string,
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isHighLighted: boolean,
  isAnswered: boolean
}

export function Room() {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestion] = useState<Question[]>([])
  const [title, setTitle] = useState('')
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)
    roomRef.on("value", room => {
      const databaseRoom = room.val()
      console.log(databaseRoom.questions)
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
      console.log(parsedQuestion)
      setTitle(databaseRoom.title)
      setQuestion(parsedQuestion)
    })
  }, [roomId])
  async function handleSendNewQuestion(event: FormEvent) {
    event.preventDefault()
    if (newQuestion.trim() === "") {
      return;
    }
    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar
      },
      isHighLighted: false,
      isAnswered: false
    }
    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }
  return (
    <div className="flex flex-col">
      <header className="p-3 bottom-1 border-solid border-slate-300">
        <div className="flex max-w-5xl justify-between m-auto items-center">
          <img className="max-h-11" src={logoImg} alt="imagem logo" />
          <RoomCode code={params.id} />
        </div>
      </header>
      <main className="w-full max-w-4xl m-auto">
        <div className="mt-8 mr-0 ml-6 flex items-center">
          <h1 className="text-2xl font-black text-gray-700">{title}</h1>
          <span className="ml-4 bg-fuchsia-400 rounded-full text-white font-medium text-sm px-4 py-2">
          { questions.length > 0 ? questions.length : 0} pergunta(s)</span> 
        </div>
        <form onSubmit={handleSendNewQuestion}>
          <textarea
            className="w-full border-0 p-4 rounded-lg bg-slate-50 shadow-xl resize-y min-h-32"
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          >
          </textarea>
          <div className="flex justify-between items-center mt-6">
            {user ? (
              <div className="flex items-center">
                <img 
                src={user.avatar} alt={user.name} 
                className="rounded-full h-12 mr-3 border-2 border-violet-700 border-solid"/>
                <span
                className="font-bold text-base text-slate-600"
                >
                {user.name}
                </span>
              </div>
            ) : (
              <span
                className="text-sm text-gray-500 font-bold">
                Para enviar uma pergunta,&nbsp;
                <button
                  className="bg-transparent border-0 text-violet-700 underline decoration-solid">
                  faça seu login </button>.
              </span>
            )}
            <Button
              className="h-12 px-6 py-5"
              type="submit"
              disabled={!user}
            >
              Enviar Pergunta
            </Button>
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  )
}

