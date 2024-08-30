import { Link } from "react-router-dom"

interface buttonProps {
    text: string;
    handleClick: () => void;
}

export const Button = ({ text, handleClick }: buttonProps) => {
    return (
        <button className="bg-blue-950 text-white text-opacity-80 font-bold border border-white border-1 hover:cursor-pointer hover:bg-blue-900 px-4 py-2 w-40 my-4 md:my-8" onClick={handleClick}>

            {text}
        </button>
    )
}