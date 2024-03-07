import logoImg from "../assets/logo.svg"
import { Button } from "../components/Button"
export function Room() {
    return (
        <div className="flex">
            <header>
                <div className="">
                    <img src={logoImg} alt="imagem logo" />
                    <div>
                        codigo
                    </div>
                </div>
            </header>
            <main className="flex flex-col">
                <div>
                    <h1>Sala React</h1>
                    <span>$ perguntas</span>                    
                </div>
                <form>
                    <textarea
                    placeholder="O que você quer perguntar?">
                    </textarea>
                </form>
                <div>
                    <span></span>
                    <Button type="submit">Enviar Pergunta</Button>
                </div>
            </main>
        </div>
    )
}