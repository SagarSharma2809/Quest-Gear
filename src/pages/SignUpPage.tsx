import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function SignUpPage() {

    const [inputData, setInputData] = useState({ "username": "", "email": "", "password": "", "confirm": "" })
    const [isConfirmPasswordMatched, setIsConfirmPasswordMatched] = useState(true);
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
        try {
            async function submitForm() {
                const response = await axios.post(api, inputData, {
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


    return (

        <div className="flex flex-col items-center">
            <h1 className="text-center text-4xl">Create new account</h1>

            {/* submit form post to backend server */}
            <form action="" className="flex flex-col w-2/3 md:w-1/3 justify-center items-center gap-2 p-4 m-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Create Username" className="w-full border-2 border-black" name="username" onChange={handleChange} />
                <input type="email" placeholder="Enter Email" className="w-full border-2 border-black" name="email" onChange={handleChange} />
                <div>
                    <input type="password" placeholder="Enter password" className="w-full border-2 border-black" name="password" onChange={handleChange} />
                    <button><IoMdEye /></button> <IoMdEyeOff />
                </div>

                <div>
                    <input type="password" placeholder="Confirm password" className="w-full border-2 border-black" name="confirm" onChange={handleChange} />
                    <button><IoMdEye /></button> <IoMdEyeOff />
                </div>


                {!isConfirmPasswordMatched && <div className="text-red-400">Please make sure your passwords match.</div>}
                <input type="submit" className="bg-blue-900 text-white px-4 py-2 cursor-pointer hover:bg-blue-400 hover:text-black hover:border hover:border-white" value="submit" />
            </form>
        </div>
    )
}