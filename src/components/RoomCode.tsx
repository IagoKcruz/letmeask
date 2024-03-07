import copyImg from "../assets/copy.svg"

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipBoard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button
            className="flex h-10 rounded-lg overflow-hidden bg-white border cursor-pointer border-violet-700 border-solid"
            onClick={copyRoomCodeToClipBoard}
        >
            <div className="bg-violet-700 px-2 py-3 flex justify-center items-center">
                <img src={copyImg} alt="copy code" />
            </div>
            <span
                className="block px-4 self-center flex-1 text-sm font-bold">Sala #{props.code}
            </span>
        </button>
    )
}