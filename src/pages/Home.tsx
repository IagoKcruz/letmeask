import { useAuth } from '../hooks/useAuth'
import { useHistory } from "react-router-dom"
import illustrationImg from "../assets/illustration.svg"
import logoImg from "../assets/logo.svg"
import googleImg from "../assets/google-icon.svg"
import { Button } from "../components/Button"
import { FormEvent, useState } from "react"



export function Home() {
    const history = useHistory()
    const [roomCode, setRoomCode] = useState('')
    function hendleCreateRoom() {
    const { user, signInWithGoogle } = useAuth()
    async function hendleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        history.push("/rooms/new")
    }
    function handleJoinRoom(event: FormEvent) {
        event.preventDefault()
        if (roomCode.trim() === "") {
            return;
        }
        const roomRef = await database.ref(`/rooms;${roomCode}`).get()

        if(!roomRef.exists()){
            alert("Room does not exists");
             return;
        }

        history.push(`rooms/${roomCode}`)

        if (roomCode !== "1") {
            alert("Room does not exists");
            return;
        }

        history.push(`rooms/${roomCode}`)

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
                    <button
                        onClick={hendleCreateRoom}
                        className="mt-8 h-12 rounded-lg bg-red-500 text-white flex justify-center items-center border-0 cursor-pointer hover:brightness-90">
                        <img className="mr-6" src={googleImg} alt="" />
                        Crie sua sala com o google
                    </button>
                    <div
                        className="text-lg text-slate-400 flex items-center mx-0 my-8 before:content-[''] before:flex-1 before:h-0.5 before:bg-slate-400 before:mr-4 after:content-[''] after:flex-1 after:h-0.5 after:bg-slate-400 after:ml-4">
                        ou entre numa sala
                    </div>
                    <form onClick={handleJoinRoom} >
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            className="w-full h-11 rounded-lg px-4 bg-white border border-solid border-slate-100"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button
                            type="submit"
                            className="w-full mt-8 h-12 px-0 py-4">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
