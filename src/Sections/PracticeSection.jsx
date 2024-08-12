


export default function PracticeSection({ charName }) {

    const charStats = {
        Knight: {
            emoji: "⚔️",
            hearts: "❤️❤️❤️❤️❤️",
            idle: '/Img/Knight Idle.gif',
            width: "2/3"
        },

        Archer: {
            emoji: "🏹",
            hearts: "❤️❤️❤️",
            idle: '/Img/Archer Idle.gif',
            width: "1/2"
        },

        Mage: {
            emoji: "📖",
            hearts: "❤️❤️",
            idle: '/Img/Mage Idle.gif',
            width: "1/2"
        },

        Rogue: {
            emoji: "🔪",
            hearts: "❤️❤️❤️❤️",
            idle: "Img/Rogue Idle.gif",
            width: "1/2"
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




        </div>
    )
}