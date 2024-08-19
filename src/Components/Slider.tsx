import Card from "./Card"

interface Character {
    name: string;
    role: string;
    img: string;
    weapons: string[];
    skills: Record<string, string | undefined>;
}

interface SliderProps {
    characters: Character[];
    current: number;
}

export default function Slider({ characters, current }: SliderProps) {
    return (
        <div className="overflow-hidden relative">


            <div className={`flex transition ease-out duration-400`} style={{ transform: `translateX(-${current * 100}%)` }}>

                {
                    characters.map((character) => {
                        return <Card characterData={character} />
                    })
                }

            </div>


        </div>
    )
}