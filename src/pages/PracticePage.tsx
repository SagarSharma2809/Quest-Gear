import { useState } from "react";

import Paragraph from "../Components/Paragraph"
import { Heading } from "../Components/Heading";

const charStats = {
    Knight: {
        emoji: "⚔️",
        hearts: "❤️❤️❤️❤️❤️",
        idle: '/Img/Knight Idle.gif',
        width: '40'
    },

    Archer: {
        emoji: "🏹",
        hearts: "❤️❤️❤️",
        idle: '/Img/Archer Idle.gif',
        width: '40'
    },

    Mage: {
        emoji: "📖",
        hearts: "❤️❤️",
        idle: '/Img/Mage Idle.gif',
        width: '40'
    },

    Rogue: {
        emoji: "🔪",
        hearts: "❤️❤️❤️❤️",
        idle: "Img/Rogue Idle.gif",
        width: '40'
    }
}

interface PracticeSectionProps {
    charName: keyof typeof charStats;
}

export default function PracticePage({ charName }: PracticeSectionProps) {

    const [input, setInput] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(() => event.target.value);
    }

    return (
        <div className="p-4 h-screen">
            {/* <div className="m-10 text-center">
                <Heading text="Practice Zone" />
            </div> */}


            <div className="w-1/5 p-4 flex flex-col">

                <div className="text-xl font-bold flex items-center">
                    <div>{charName.toUpperCase()}</div>
                    <div>{charStats[charName].emoji}</div>
                    <div>{charStats[charName].hearts}</div>
                </div>
                <img src={charStats[charName].idle} alt="" className={`w-${charStats[charName].width} my-4`} />

            </div>

            <div className="text-2xl w-1/2 m-auto">
                <div className="">
                    <Paragraph charName={charName} userInput={input} />
                </div>


                <input type="text" className="w-full my-4 p-2" placeholder="Start typing here..." value={input} onChange={handleChange} autoFocus />


            </div>





        </div>
    )
}