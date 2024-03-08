import { ReactNode } from "react"
type QuestionsProps = {
    content: string,
    author:{
        name: string,
        avatar:string
    }
    children?: ReactNode,
    isAnswered?: boolean,
    isHighLighted?: boolean
}
export function Question({
    content,
    author,
    isAnswered = false,
    isHighLighted = false,
    children
}: QuestionsProps) {
    return(
        <div className={ isAnswered === false ? (
            isHighLighted ? ("bg-slate-100 border-violet-700 border-solid border rounded-lg shadow-sm p-6 mt-4"):("bg-slate-50 rounded-lg shadow-sm p-6 mt-4" )
        ): (
            "bg-gray-300 rounded-lg shadow-sm p-6 mt-4"
        )} >
            <p>
                {content}
            </p>
            <footer className="flex justify-between items-center mt-6">
            <div className="flex items-center">
                <img 
                src={author.avatar} alt={author.name} 
                className="rounded-full h-6 mr-3 border-2 border-violet-700 border-solid"/>
                <span
                className="font-extrabold text-xs text-slate-400"
                >
                {author.name}
                </span>
              </div>
                <div >
                    {children}
                </div>
            </footer>
        </div>
    )
}

