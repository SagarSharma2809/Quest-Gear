import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import InputForm from "../Components/InputForm";
import { Heading } from "../Components/Heading";

const LoginPageStyles: React.CSSProperties = {
    backgroundImage: `url("/Img/signUpBg.jpg")`,
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

export default function Login() {

    const [isLogin, setIsLogin] = useState(true);  //Login mode by default

    const [isConfirmPasswordMatched, setIsConfirmPasswordMatched] = useState(true);
    const [error, setError] = useState(false);
    const [inputData, setInputData] = useState({ "username": "", "email": "", "password": "", "confirm": "" })

    const navigate = useNavigate();

    const changeMode = () => {
        setIsLogin(!isLogin);
    }

    const handleChange = (e: any) => {
        console.log(e.target.value);
        const value = e.target.value;
        const name = e.target.name;

        setInputData((prevInputs) => {
            return { ...prevInputs, [name]: value }
        })
    }

    let api = isLogin ? '/login' : '/register';

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        if (!isLogin && inputData.password != inputData.confirm) {
            setIsConfirmPasswordMatched(false);
            return;
        }

        const { confirm, email, ...dataToSend } = inputData;

        try {

            const response = await axios.post(api, dataToSend, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.status == 201) {
                if (isLogin) {
                    changeMode();
                    navigate("/");
                    setError(false);
                }
                else {
                    changeMode();
                    navigate("/login")
                }

            }
            else if (isLogin && response.status == 401) {

                setError(true);
                console.log("password or username incorrect");
            }

            setInputData({ "username": "", "email": "", "password": "", "confirm": "" })
        }

        catch (e) {
            console.log("Error in submitting data", e);
            setError(true);
        }

    }

    return (
        <>

            <div className="h-screen" style={LoginPageStyles}>
                <div style={overlayStyles}></div>


                <div className=" h-full" style={contentStyles}>
                    <nav className="px-2 py-2 top-0 sticky w-full">
                        <div className="    ">
                            <NavLink to="/"><div className="text-2xl text-white font-bold">Quest Gear</div></NavLink>
                        </div>
                    </nav>


                    <div className="container p-20 ">

                        <Heading text={isLogin ? "Log in your Account" : "Create new Account"} />

                        {/* submit form post to backend server */}


                        <InputForm inputData={inputData} onChange={handleChange} onSubmit={handleSubmit} type={isLogin ? "login" : "signup"} />


                        <div className="text-white">
                            {isLogin ? (
                                <>
                                    Don’t have an account?{' '}
                                    <NavLink to="/signup" onClick={changeMode} className="text-blue-500">
                                        Sign up
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <NavLink to="/login" onClick={changeMode} className="text-blue-500">
                                        Log In
                                    </NavLink>
                                </>
                            )}
                        </div>



                        {!isLogin && !isConfirmPasswordMatched && <div className="text-red-400">Please make sure your passwords match.</div>}

                        {isLogin && error &&

                            <div className="text-red-400">Username or Password is incorrect</div>
                        }
                    </div>


                </div>
            </div>
        </>
    )
}