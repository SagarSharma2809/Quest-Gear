import { Link } from "react-router-dom"

interface buttonProps {
    text: string;
    handleClick: () => void;
}

export const Button = ({ text, handleClick }: buttonProps) => {
    return (
        <button className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-700 px-4 py-2 w-40 my-4 md:my-8" onClick={handleClick}>

            {text}
        </button>
    )
}