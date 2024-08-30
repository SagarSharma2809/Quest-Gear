import Card from "./Card"
import { useAppSelector } from "../app/hooks";


interface SliderProps {

    current: number;
}

export default function Slider({ current }: SliderProps) {

    const characters = useAppSelector(state => state.characters);

    return (
        <div className="overflow-hidden relative">


            <div className={`flex transition ease-out duration-400`} style={{ transform: `translateX(-${current * 100}%)` }}>

                {
                    characters.map((character) => {
                        return <Card character={character} />
                    })
                }

            </div>


        </div>
    )
}