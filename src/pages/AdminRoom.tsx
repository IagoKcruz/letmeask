import { useHistory, useParams } from "react-router-dom"
import logoImg from "../assets/logo.svg"
import deleteImg from "../assets/delete.svg"
import { RoomCode } from "../components/RoomCode"
//import { useAuth } from "../hooks/useAuth"
import { Question } from "../components/Question"
import { useRoom } from "../hooks/useRoom"
import { Button } from "../components/Button"
import { database } from "../services/firebase"

type RoomParams = {
  id: string
}

export function AdminRoom() {
  //const { user } = useAuth()
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const { questions, title } = useRoom(roomId)

  async function handleDeletequestion(questionId: string) {
    if(window.confirm("Tem certeza que deseja excluir esta pergunta"))
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
  }

  async function handleEndRoom() {
      await database.ref(`/rooms/${roomId}`).update({
        endedAt: new Date(0)
      })
      history.push("/")
  }

  return (
    <div className="flex flex-col">
      <header className="p-3 bottom-1 border border-solid border-slate-300">
        <div className="flex max-w-5xl justify-between m-auto items-center">
          <img className="max-h-11" src={logoImg} alt="imagem logo" />
          <div
            className="flex gap-x-4"
          >
            <RoomCode code={params.id} />
            <Button
            isOutLined
            className="px-6 py-2"
            onClick={handleEndRoom}
            >Encerrar Sala</Button>
          </div>

        </div>
      </header>
      <main className="w-full max-w-4xl m-auto">
        <div className="mt-8 mr-0 ml-6 flex items-center">
          <h1 className="text-2xl font-black text-gray-700">{title}</h1>
          <span className="ml-4 bg-fuchsia-400 rounded-full text-white font-medium text-sm px-4 py-2">
            {questions.length > 0 ? questions.length : 0} pergunta(s)</span>
        </div>
        {questions.map(questions => {
          return (
            <Question
              key={questions.id}
              content={questions.content}
              author={questions.author}
            >
              <button
              type="button"
              onClick={()=> handleDeletequestion(questions.id)}>
              <img src={deleteImg} alt="remover pergunta" />
              </button>
            </Question>
          )
        })}
      </main>
    </div>
  )
}

