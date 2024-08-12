export default function PracticeSection({ charName }) {

    const charStats = {
        Knight: {
            emoji: "⚔️",
            hearts: "❤️❤️❤️❤️❤️"
        },

        Archer: {
            emoji: "🏹",
            hearts: "❤️❤️❤️"
        },

        Mage: {
            emoji: "📖",
            hearts: "❤️❤️"
        },

        Rogue: {
            emoji: "🔪",
            hearts: "❤️❤️❤️❤️"
        }
    }

    return (
        <div className="p-4 bg-blue-500 h-screen">
            <h1 className="text-5xl text-center text-white">Practice Zone</h1>

            <div className="bg-white w-1/4 p-4 flex items-center">

                <h2 className="text-xl font-bold">{charName.toUpperCase()} {charStats[charName].emoji} {charStats[charName].hearts}</h2>

            </div>

        </div>
    )
}