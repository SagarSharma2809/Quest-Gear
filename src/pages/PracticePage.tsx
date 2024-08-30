import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import Paragraph from "../Components/Paragraph";
import { VscDebugRestart } from "react-icons/vsc";

export default function PracticePage() {
    const characters = useAppSelector(state => state.characters);
    const current = useAppSelector(state => state.current);

    const [input, setInput] = useState<string>("");
    const [restart, setRestart] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(() => event.target.value);
    };

    const restartButton = () => {
        setRestart(!restart);
        setInput("");
    };

    const PracticePageStyles: React.CSSProperties = {
        backgroundImage: `url("${characters[current].bgImg}")`,
        backgroundSize: "cover",
        backgroundPosition: 'center 20%',
        position: 'relative',
        zIndex: 1,
    };

    const overlayStyles: React.CSSProperties = {
        position: 'absolute' as 'absolute', // Explicitly cast to 'absolute'
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 70% opacity
        zIndex: 2,
    };

    const contentStyles: React.CSSProperties = {
        position: 'relative' as 'relative', // Ensures content is above overlay
        zIndex: 3,
    };

    return (
        <div className="relative h-screen text-white" style={PracticePageStyles}>
            {/* Overlay */}
            <div style={overlayStyles}></div>

            {/* Content */}
            <div className="p-4" style={contentStyles}>
                <div className="w-1/5 p-4 flex flex-col">
                    <div className="text-xl font-bold flex items-center">
                        <div className="opacity-80">{characters[current].name}</div>
                        <div>{characters[current].emoji}</div>
                        <div>{characters[current].hearts}</div>
                    </div>
                    <img src={characters[current].idle} alt="" className={`w-${characters[current].width} my-4`} />
                </div>

                <div className="text-2xl w-1/2 m-auto flex flex-col justify-center items-center">
                    <div className="">
                        <Paragraph userInput={input} restart={restart} />
                    </div>

                    <input
                        type="text"
                        className="w-full my-4 p-2 text-black border-slate-500 border-2"
                        placeholder="Start typing here..."
                        value={input}
                        onChange={handleChange}
                        autoFocus
                    />

                    <button
                        className="text-4xl text-white opacity-80 hover:opacity-100"
                        onClick={restartButton}
                    >
                        <VscDebugRestart />
                    </button>
                </div>
            </div>
        </div>
    );
}
