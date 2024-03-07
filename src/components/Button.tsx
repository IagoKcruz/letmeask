import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {

    console.log(props)

    return (
        <button
            type={props.type}
            className={`${props.className} rounded-lg bg-violet-700 text-white flex justify-center items-center border-0 cursor-pointer hover:brightness-90 disabled:opacity-60 disabled:cursor-not-allowed`}
        >{props.children}</button>
    )
}

