type QuestionsProps = {
    content: string,
    author:{
        name: string,
        avatar:string
    }
}
export function Question({
    content,
    author
}: QuestionsProps) {
    return(
        <div className="bg-slate-50 rounded-lg shadow-sm p-6 mt-4">
            <p className="text-slate-600">
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
                <div className="">
                    user / admin
                </div>
            </footer>
        </div>
    )
}