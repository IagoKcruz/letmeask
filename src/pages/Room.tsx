import { useParams } from "react-router-dom"
import logoImg from "../assets/logo.svg"
import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { FormEvent, useEffect, useState } from "react"
type RoomParams = {
  id: string
}
type firebaseQuestions = Record<string, {
  id: string,
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isHighLighted: boolean,
  isAnswered: boolean
}>
type Questions = Record<string, {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isHighLighted: boolean,
  isAnswered: boolean
}>
export function Room() {
  const params = useParams<RoomParams>()
  //const roomId = params.id
  const [newQuestion, setNewQuestion] = useState('')
  const [question, setQuestion] = useState<Questions[]>([])
  const [ title, setTitle] = useState('')
  useEffect(()=>{
    const roomRef = database.ref(`rooms/${roomId}`)
    roomRef.once("value", room =>{
      const databaseRoom = room.val()
      const firebaseQuestions : firebaseQuestions = databaseRoom.questions ?? {}
      const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value])=>{
        return {
          id: key,
          content: value.content,
          author: value.isHighLighted,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered
        }
      setTitle(databaseRoom.title)  
      setQuestion(parsedQuestion)
      })
    })
  } [roomId])
  function handleSendNewQuestion(event: FormEvent) {
    event.preventDefault()
    if (newQuestion.trim() === "") {
      return;
    }
    // if(!user){

    // }
    // const question = {
    //   content: newQuestion,
    //   author: {
    //     name: user.name,
    //     avatar: user.avatar
    //   },
    //   isHighLighted: false,
    //   isAnswered: false
    // }
    // await database.ref(`rooms/${roomId}/questions`).push(question)

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
          <h1 className="text-2xl font-extrabold text-gray-700">Sala React</h1>
          <span className="ml-4 bg-fuchsia-400 rounded-full text-white font-medium text-sm px-4 py-2">
            Pergunta(s)</span>
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
            <span
              className="text-sm text-gray-500 font-bold">
              Para enviar uma pergunta,&nbsp;
              <button
                className="bg-transparent border-0 text-violet-700 underline decoration-solid">
                faça seu login </button>.
            </span>
            <Button
              className="h-12 px-6 py-5"
              type="submit"
            //disabled={!user}
            >
              Enviar Pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

// {user ?(
//   <div className="flex items-center">
//     {/* < className="w-8 h-8 rounded-full" img src={user.avatar} alt={user.avatar} />
//     <span
//       className="text-sm text-gray-500 font-bold ml-2"
//     >
//     {user.name}
//     </span> */}
//   </div>
// ):(
//   <span
//     className="text-sm text-gray-500 font-bold">
//     Para enviar uma pergunta,&nbsp;
//     <button
//       className="bg-transparent border-0 text-violet-700 underline decoration-solid">
//       faça seu login </button>.
//   </span>
// )}