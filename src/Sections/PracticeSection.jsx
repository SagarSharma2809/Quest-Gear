import Paragraph from "../Components/Paragraph"


export default function PracticeSection({ charName }) {

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

    return (
        <div className="p-4 bg-blue-500 h-screen">
            <h1 className="text-5xl text-center text-white">Practice Zone</h1>

            <div className="w-1/5 p-4 text-white flex flex-col">

                <div className="text-xl font-bold flex items-center">
                    <div>{charName.toUpperCase()}</div>
                    <div>{charStats[charName].emoji}</div>
                    <div>{charStats[charName].hearts}</div>
                </div>
                <img src={charStats[charName].idle} alt="" className={`w-${charStats[charName].width} my-4`} />

            </div>

            <div className="text-2xl w-1/2 m-auto">
                <div className="text-white">
                    <Paragraph charName={charName} />
                </div>


                <input type="text" className="w-full my-4 p-2" placeholder="Start typing here..." autoFocus />
            </div>





        </div>
    )
}