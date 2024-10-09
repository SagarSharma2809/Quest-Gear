import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PasswordInput from "../Components/PasswordInput";
import { Button } from "../Components/Button";
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

export default function LoginPage() {
    const [inputData, setInputData] = useState({ "username": "", "password": "" })
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;

        setInputData((prevInputs) => {
            return { ...prevInputs, [name]: value }
        })
    }

    let api = '/login';


    const handleSubmit = async (e: any) => {

        e.preventDefault();


        try {

            const response = await axios.post(api, inputData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.status == 201) {
                navigate("/");
                setError(false);
            }
            else if (response.status == 401) {
                setError(true);
                console.log("password or username incorrect");
            }

        }
        catch (e) {
            console.log("Error in submitting data", e);
            setError(true);
        }



    }


    return (

        <div className="h-screen" style={LoginPageStyles}>
            <div style={overlayStyles}></div>


            <div className="flex flex-col h-full items-center p-20" style={contentStyles}>

                <Heading text="Log in your Account" />



                {/* submit form post to backend server */}
                <form action="" className="flex flex-col w-2/3 md:w-1/3 justify-center items-center gap-2 p-4 m-4" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Create Username" className="w-full border-2 border-black" name="username" value={inputData.username} onChange={handleChange} required />



                    <PasswordInput name="password" placeholder="Enter your password..." value={inputData.password} onChange={handleChange} />

                    <Button text="Log in" type="submit" handleClick={null} />

                    {error &&

                        <div className="text-red-400">Username or Password is incorrect</div>
                    }
                </form>
            </div>
        </div>
    )
}


