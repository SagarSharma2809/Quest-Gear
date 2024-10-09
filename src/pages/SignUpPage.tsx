import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import PasswordInput from "../Components/PasswordInput";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";

const SignUpPageStyles: React.CSSProperties = {
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

export default function SignUpPage() {

    const [inputData, setInputData] = useState({ "username": "", "email": "", "password": "", "confirm": "" })
    const [isConfirmPasswordMatched, setIsConfirmPasswordMatched] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;

        setInputData((prevInputs) => {
            return { ...prevInputs, [name]: value }
        })
    }

    let api = '/register';


    const handleSubmit = (e: any) => {

        e.preventDefault();

        if (inputData.password != inputData.confirm) {
            setIsConfirmPasswordMatched(false);
            return;
        }

        const { confirm, ...dataToSend } = inputData;

        try {
            async function submitForm() {
                const response = await axios.post(api, dataToSend, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

            }
            submitForm();

            navigate("/login");  //returns to home page
        }
        catch (e) {
            console.log("Error in submitting data", e);
        }
    }

    const setIcon = () => {
        setShowPassword(!showPassword);
    }


    return (

        <div className="h-screen" style={SignUpPageStyles}>
            <div style={overlayStyles}></div>


            <div className="flex flex-col h-full items-center p-20" style={contentStyles}>
                <Heading text="Create new Account" />

                {/* submit form post to backend server */}
                <form action="" className="flex flex-col w-2/3 md:w-1/3 justify-center items-center gap-2 p-4 m-4" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Create Username" className="w-full border-2 border-black" name="username" value={inputData.username} onChange={handleChange} required />

                    <input type="email" placeholder="Enter Email" className="w-full border-2 border-black" name="email" value={inputData.email} onChange={handleChange} autoComplete="off" required />

                    <PasswordInput name="password" placeholder="Enter your password..." value={inputData.password} onChange={handleChange} />

                    <PasswordInput name="confirm" placeholder="Confirm password" value={inputData.confirm} onChange={handleChange} />


                    {!isConfirmPasswordMatched && <div className="text-red-400">Please make sure your passwords match.</div>}

                    <Button text="Sign up" type="submit" handleClick={null} />
                </form>
            </div>
        </div>
    )
}