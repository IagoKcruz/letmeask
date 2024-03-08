import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutLined?: boolean
}

export function Button({isOutLined = false, ...props}: ButtonProps) {
    return (
        <button
            {...props}
            className={`${props.className} ${isOutLined ? "bg-white border border-solid border-violet-700 text-violet-700" : "bg-violet-700 text-white border-0"} rounded-lg flex justify-center items-center cursor-pointer hover:brightness-90 disabled:opacity-60 disabled:cursor-not-allowed`}
            >
            {props.children}
            </button>
    )
}

