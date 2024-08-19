interface Character {
    name: string;
    role: string;
    img: string;
    weapons: string[];
    skills: Record<string, string | undefined>
}

interface cardProps {
    characterData: Character;
}

export default function Card({ characterData }: cardProps) {
    return (
        <div className="border border-blue-500 border-2 min-w-[100%] h-full flex flex-col lg:flex-row">


            <div className="w-full md:w-3/4 lg:w-1/2 h-1/2 md:h-full m-2 md:m-4">
                <h2 className=" text-2xl md:text-4xl md:mb-4 font-bold">{characterData.name}</h2>
                <h3 className="md:text-xl"> {characterData.role} </h3>
                <div className="my-4"> <span className="font-bold">Weapons:</span>  {characterData.weapons.join(", ")} </div>
                <h3 className="text-lg md:text-xl">Skills</h3>
                <ul className="">
                    {Object.entries(characterData.skills).map(([key, value]) => (
                        <li className="text-sm md:text-base my-1 md:my-0"> <span className="font-bold">{key}</span> : {value}</li>
                    ))}
                </ul>



            </div>

            <div className="w-full lg:w-1/2">
                <img src={characterData.img} alt="" className="h-full" />
            </div>

        </div>
    )
}

