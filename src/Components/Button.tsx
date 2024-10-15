

interface buttonProps {
    text: string;
    type: "button" | "submit" | "reset";
    handleClick?: ((e: any) => void) | null;
}

export const Button = ({ text, type, handleClick }: buttonProps) => {
    return (
        <button type={type} className="bg-blue-950 text-white text-opacity-80 font-bold border border-white border-1 hover:cursor-pointer hover:bg-blue-900 px-4 py-2 w-40 my-4 md:my-8" onClick={handleClick ? handleClick : undefined}>

            {text}
        </button>
    )
}