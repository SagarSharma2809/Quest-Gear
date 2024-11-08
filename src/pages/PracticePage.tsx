import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import Paragraph from "../Components/Paragraph";
import { VscDebugRestart } from "react-icons/vsc";

export default function PracticePage() {
    const characters = useAppSelector(state => state.character);
    const current = useAppSelector(state => state.currentCharacter);

    const [input, setInput] = useState<string>("");
    const [restart, setRestart] = useState<boolean>(false);
    const [typingSpeedData, setTypingSpeedData] = useState<{ speed: string | null; accuracy: string | null }>({ speed: null, accuracy: null });
    const [charState, setCharState] = useState<number>(1);
    //1: idle
    //2: takeHit
    //3: attack1
    //4: specialAttack

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(() => event.target.value);
    };

    const restartButton = () => {
        setRestart(!restart);
        setInput("");
    };



    function updateSpeed(wpm: string | null, accuracy: string | null) {
        setTypingSpeedData(() => {
            return { speed: wpm, accuracy: accuracy }
        })
    }

    function updateCharState(num: number) {
        setCharState(num);
    }

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
                <div className="p-4 flex flex-col">
                    <div className="text-xl font-bold flex items-center">
                        <div className="opacity-80">{characters[current].name}</div>
                        <div>{characters[current].emoji}</div>
                        <div>{characters[current].hearts}</div>
                    </div>

                    <div className="h-64 flex items-end ">
                        {
                            {
                                1: <img src={characters[current].idle} alt="" className={`${characters[current].widthIdle} my-4`} />,
                                2: <img src={characters[current].takeHit} alt="" className={`${characters[current].widthTakeHit} my-4`} />,
                                3: <img src={characters[current].attack1} alt="" className={`${characters[current].widthAttack1} my-4`} />,
                                4: <img src={characters[current].specialAttack} alt="" className={`${characters[current].widthSpecialAttack} my-4`} />,
                            }[charState]
                        }

                    </div>


                </div>

                <div className="text-2xl w-1/2 m-auto flex flex-col justify-center items-center">
                    <div className="">
                        <Paragraph userInput={input} restart={restart} updateSpeed={updateSpeed} updateCharState={updateCharState} />
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



                    {typingSpeedData.speed &&
                        <div className=''>
                            <div>Typing Speed:<span className=''>{typingSpeedData.speed} wpm</span></div>
                            <div>Accuracy: <span className="">{typingSpeedData.accuracy}%</span></div>

                        </div>
                    }

                </div>
            </div>
        </div>
    );
}
