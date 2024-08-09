import Card from "./Card"




export default function Slider({ characters, current }) {
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