import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../app/hooks'
import { userDataUpdate } from "../features/Users/userSlice";
import axios from 'axios';

import InputForm from "../Components/InputForm";
import Heading2 from "../Components/Heading2";

const LoginPageStyles: React.CSSProperties = {
    backgroundImage: `url("/Img/loginBg.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: 'center 20%',
    position: 'relative',
    zIndex: 1,
};


const contentStyles: React.CSSProperties = {
    position: 'relative' as 'relative', // Ensures content is above overlay
    zIndex: 3,

};

export default function Login() {

    const [isLogin, setIsLogin] = useState<boolean>(true);  //Login mode by default

    const [isConfirmPasswordMatched, setIsConfirmPasswordMatched] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [inputData, setInputData] = useState({ "username": "", "email": "", "pass": "", "confirm": "" })


    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const changeMode = () => {
        setIsLogin(!isLogin);
    }

    useEffect(() => {

        setIsConfirmPasswordMatched(true);
        setError(false);
        setInputData({ "username": "", "email": "", "pass": "", "confirm": "" })
    }, [isLogin])

    const handleChange = (e: any) => {

        const value = e.target.value;
        const name = e.target.name;

        setInputData((prevInputs) => {
            return { ...prevInputs, [name]: value }
        })
    }

    let api = isLogin ? '/api/login' : '/register';

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        if (!isLogin && inputData.pass != inputData.confirm) {
            setIsConfirmPasswordMatched(false);
            return;
        }
        const requestData = isLogin
            ? (({ confirm, email, ...rest }) => rest)(inputData)  // Extract login data
            : (({ confirm, ...rest }) => rest)(inputData);        // Extract signup data

        try {

            const response = await axios.post(api, requestData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.status == 201) {
                if (isLogin) {
                    const currentUsername = response.data.username;
                    const currentEmail = response.data.email;

                    dispatch(userDataUpdate({ "username": currentUsername, "email": currentEmail }))
                    changeMode();
                    navigate("/");
                    setError(false);
                }
                else {
                    changeMode();
                    navigate("/login")
                }

            }
            else if (!isLogin && response.status == 409) {
                setError(true);
                console.log("Email already exists. Try loggin in. ");
            }
            else if (isLogin && response.status == 401) {

                setError(true);
                console.log("password or username incorrect");
            }

            setInputData({ "username": "", "email": "", "pass": "", "confirm": "" })
        }

        catch (e) {
            console.log("Error in submitting data", e);
            setError(true);
        }

    }

    return (
        <>

            <div className="h-screen" style={LoginPageStyles}>


                <div className=" h-full" style={contentStyles}>
                    <nav className="px-2 py-2 top-0 sticky w-full">
                        <div className="    ">
                            <NavLink to="/"><div className="text-2xl text-white font-bold">Quest Gear</div></NavLink>
                        </div>
                    </nav>


                    <div className="container h-2/3 flex justify-center lg:justify-end items-center">


                        <div className="p-8 lg:mr-60 flex flex-col justify-center items-center lg:w-1/3 bg-white">

                            {/* <Heading text={isLogin ? "Log in your Account" : "Create new Account"} /> */}
                            <Heading2 text={isLogin ? "Log in your Account" : "Create new Account"} />

                            {/* submit form post to backend server */}


                            <InputForm inputData={inputData} onChange={handleChange} onSubmit={handleSubmit} type={isLogin ? "login" : "signup"} />


                            <div className="text-blue-950">
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

                            {error &&

                                <div className="text-red-400">{isLogin ? "Username or Password is incorrect" : "Email already exists. Try loggin in. "}</div>
                            }

                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}