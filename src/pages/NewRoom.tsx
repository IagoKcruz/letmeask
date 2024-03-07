import { Link, useHistory } from "react-router-dom"
import illustrationImg from "../assets/illustration.svg"
import logoImg from "../assets/logo.svg"
import { Button } from "../components/Button"
import { FormEvent, useState } from "react"

export function NewRoom() {
    const history = useHistory()
    const [newRoom, setNewRoom ] = useState('')    
    function hendleCreateRoom(event: FormEvent){
        event.preventDefault()
        if(newRoom.trim() == ""){
            return;
        }
        //enviar para devHome/IK
        //const roomRef = database.ref("rooms")
        //const firebaseRoom = await roomRef.push({
        //     title: newRoom,
        //     authorID: user?.id,
        // })
        //history.push(`/rooms/${firebaseRoom.key}`)
        history.push(`/rooms/1`)
    }
    return (
        <div className="h-screen flex flex-row items-stretch " id="page-auth">
            <aside className="w-1/2 flex flex-col justify-center py-32 px-20 bg-violet-600">
                <img className="max-w-80" src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong className="leading-12 mt-1 font-bold text-4xl text-gray-300">Crie salas de Q&amp;A ao-vivo</strong>
                <p className="leading-10 mt-1 text-2xl text-gray-300">Tire dúvidas da sua audiência em tempo real</p>
            </aside>
            <main className="w-1/2 flex justify-center items-center p-32">
                <div className="flex flex-col w-full max-w-80 items-stretch text-center">
                    <img className="self-center max-w-40" src={logoImg} alt="Letmeask" />
                    <h2 className="text-3xl mt-12 mb-8 font-extrabold">
                        Criar uma nova sala</h2>
                    <form onClick={hendleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            className="w-full h-11 rounded-lg px-4 bg-white border border-solid border-slate-100"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button 
                        type="submit"
                        className="w-full mt-8 h-12 px-0 py-4 rounded-lg bg-violet-700 text-white flex justify-center items-center border-0 cursor-pointer hover:brightness-90 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            Criar Sala
                        </Button>
                    </form>
                    <p className="text-sm text-slate-400 mt-4">
                        Quer entrar em uma sala existente?
                        <Link to="/" className="text-purple-500 ml-1">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
