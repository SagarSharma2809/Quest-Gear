

export default function Card({ characterData }) {
    return (
        <div className="border border-blue-500 border-2 w-fit flex flex-col md:flex-row">


            <div className="w-96 m-4">
                <h2 className="text-3xl mb-4 font-bold">{characterData.name}</h2>
                <h3 className="text-xl"> {characterData.role} </h3>
                <div className="my-4"> <span className="font-bold">Weapons:</span>  {characterData.weapons.join(", ")} </div>
                <h3 className="text-xl">Skills</h3>
                <ul className="">
                    {Object.entries(characterData.skills).map(([key, value]) => (
                        <li className=""> <span className="font-bold">{key}</span> : {value}</li>
                    ))}
                </ul>



            </div>

            <div className="w-full md:w-96">
                <img src={characterData.img} alt="" className="h-full" />
            </div>

        </div>
    )
}

