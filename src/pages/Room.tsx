import { useParams } from "react-router-dom"
import logoImg from "../assets/logo.svg"
import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { FormEvent, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "../hooks/useAuth"
import { Question } from "../components/Question"
import { useRoom } from "../hooks/useRoom"

type RoomParams = {
  id: string
}

export function Room() {
  const { user } = useAuth()
  console.log(user?.name)
  const params = useParams<RoomParams>()
  const roomId = params.id
  const [newQuestion, setNewQuestion] = useState('')
  const { questions, title } = useRoom(roomId)
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
  async function handelLikeQuestion(questionId: string, likeId: string | undefined) {
    if(likeId){
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
    }else{
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      })
    }
  }
  return (
    <div className="flex flex-col">
      <header className="p-3 bottom-1 border border-solid border-slate-300">
        <div className="flex max-w-5xl justify-between m-auto items-center">
          <img className="max-h-11" src={logoImg} alt="imagem logo" />
          <RoomCode code={params.id} />
        </div>
      </header>
      <main className="w-full max-w-4xl m-auto p-5">
        <div className="flex justify-between items-center">
          <div className="mr-0 ml-6 flex items-center"> 
          <h1 className="text-2xl font-black text-gray-700">{title}</h1>
          <span className="ml-4 bg-fuchsia-400 rounded-full text-white font-medium text-sm px-4 py-2">
            {questions.length > 0 ? questions.length : 0} pergunta(s)</span>
          </div>
          {user?.id !== questions.find(element => element.author.id !== "" ) && (
           <div>
           <Button
               className="px-6 py-2"
           >Pagina Administrador</Button>
           </div>
          )
          }         
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
                  className="rounded-full h-12 mr-3 border-2 border-violet-700 border-solid" />
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
        {questions.map(question => {
          return (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighLighted={question.isHighLighted}
            >
              {
                !question.isAnswered && [
                  <button className="flex flex-row items-end gap-x-1"
                  type="button"
                  aria-label="Marcar como gostei"
                  onClick={() => handelLikeQuestion(question.id, question.likeId)}
                >
                  <span
                  className={`${question.likeId ? "text-violet-700" : "text-slate-400" }`}
                  >{question.likeCount > 0 ? question.likeCount : 0}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" 
                    stroke={question.likeId ? "#835afd" : "#737380"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                ]
              }
            </Question>
          )
        })}
      </main>
    </div>
  )
}

