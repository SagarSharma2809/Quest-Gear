export default function Card({ characterData }) {
    return (
        <div className="border border-blue-500 border-2 m-4 flex w-1/2">


            <div className="w-1/2 m-4">
                <h2 className="text-4xl">{characterData.name}</h2>
                <h3 className="text-xl"> {characterData.role} </h3>
                <div className="my-4"> <span className="font-bold">Weapons:</span>  {characterData.weapons.join(", ")} </div>
                <h3 className="text-xl">Skills</h3>
                <ul className="">
                    {Object.entries(characterData.skills).map(([key, value]) => (
                        <li className=""> <span className="font-bold">{key}</span> : {value}</li>
                    ))}
                </ul>

                {/* <button className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-700 px-4 py-2 my-4">SELECT</button> */}

            </div>

            <div className="w-1/2">
                <img src={characterData.img} alt="" className="h-full" />
            </div>

        </div>
    )
}

