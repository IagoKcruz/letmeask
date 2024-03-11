export function ComentsBox() {
  return (
    <main className=" flex flex-col items-center">
      <div className="">
        Comentarios
      </div>
      {

      }
      <div className="w-4/5 flex items-start gap-x-2 mt-4">
        <span className="self-center"
        >Avatar</span>
        <div className="w-full items-center flex justify-between">
          <p>Aqui vai o comentário das pessoas</p>
          {/* <button className="flex flex-row items-end gap-x-1"
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() => handelLikeQuestion(question.id, question.likeId)}
                  >
                    <span
                      className={`${question.likeId ? "text-violet-700" : "text-slate-400"}`}
                    >{question.likeCount > 0 ? question.likeCount : 0}</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke={question.likeId ? "#835afd" : "#737380"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button> */}
          <button className="flex flex-row items-end gap-x-1"
            type="button"
            aria-label="Marcar como gostei"
          >
            <span> 0 </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                stroke="#835afd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <form className="w-full flex mt-6 items-stretch gap-x-1"> 
        <input 
        type="text" 
        placeholder="Escreva seu comentário aqui..."
        className="w-full px-4 py-2 rounded-lg"
        />
        <button 
        className="py-2 px-4 border border-violet-700 rounded-lg border-solid "
        >
          Enviar&nbsp;comentario
        </button>
      </form>
    </main>
  )
}