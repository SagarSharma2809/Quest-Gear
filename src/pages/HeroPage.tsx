import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useAppDispatch } from '../app/hooks'
import { currentUpdated } from "../features/Character/CurrentCharacterSlice";
import { userDataUpdate } from "../features/Users/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";
import Loading from "../Components/Loading";

const HomePageStyles: React.CSSProperties = {
    backgroundImage: `url("/Img/Home bg.jpeg")`,
    backgroundSize: "cover",
    backgroundPosition: 'center 20%',
    position: 'relative',
    zIndex: 1,
};

const overlayStyles: React.CSSProperties = {
    position: 'absolute' as 'absolute', // Explicitly cast to 'absolute'
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 70% opacity
    zIndex: 2,
};

const contentStyles: React.CSSProperties = {
    position: 'relative' as 'relative', // Ensures content is above overlay
    zIndex: 3,
};



export default function HeroPage() {

    const characters = useAppSelector(state => state.character);
    const currentNumber = useAppSelector(state => state.currentCharacter);
    const username = useAppSelector(state => state.user.username);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const [current, setCurrent] = useState(currentNumber)

    useEffect(() => {

        const getUser = async () => {
            //on mounting, call the /home/user endpoint to verify jwt token
            // setIsLoading(true);
            try {
                const response = await axios.get('/home/user', { withCredentials: true })
                if (response) {
                    //store the data of user in store
                    dispatch(userDataUpdate(response.data.userData))
                    setIsLoading(false);
                }
                else {

                    console.log("user not verified");
                }
            }
            catch (e) {
                console.log(e);
                setIsLoading(false);
            }


        }

        getUser();

    }, [])

    const nextSlide = () => {
        if (current === characters.length - 1) {
            setCurrent(0);
        }
        else {
            setCurrent((prev) => prev + 1)
        }
    }

    const prevSlide = () => {
        if (current === 0) {
            setCurrent(characters.length - 1);
        }
        else {
            setCurrent((prev) => prev - 1)
        }
    }

    const selectCharacter = () => {

        const currentSlideNumber: number = current;

        dispatch(currentUpdated(currentSlideNumber))
    }


    return (
        <>
            {isLoading ?
                <Loading />
                :
                <div className="h-full xl:h-screen overflow-hidden" style={HomePageStyles}>
                    {/* Overlay */}
                    <div style={overlayStyles}></div>

                    <div className="py-4" style={contentStyles}>
                        <div className="m-10 text-center">
                            <Heading text={`${username != "" ? `Hi ${username}, ` : ""}Choose your Character`} />
                        </div>



                        <div className="relative">

                            <div className="w-3/4 md:w-1/2 m-auto flex flex-col">
                                <div className="bg-white bg-opacity-70">
                                    <Slider current={current} />
                                </div>

                                <div className="m-auto">
                                    <Link to={`/practice/${characters[current].name}`}><Button text="SELECT" type="button" handleClick={selectCharacter} /></Link>
                                </div>

                            </div>

                            <div className="text-white text-5xl opacity-80 absolute top-0 flex h-3/4 w-full items-center justify-between xs:px-8 md:px-32 lg:px-44">
                                <button className="hover:text-white" onClick={prevSlide}><FaAngleLeft /></button>
                                <button className="hover:opacity-100" onClick={nextSlide}><FaAngleRight /></button>
                            </div>

                        </div>

                    </div>

                </div>
            }
        </>


    )
}