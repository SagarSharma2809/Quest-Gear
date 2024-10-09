import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface PasswordInputProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: any) => void;

}

export default function PasswordInput({ name, placeholder, value, onChange }: PasswordInputProps) {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className="relative flex items-center w-full">
                <input type={showPassword ? "text" : "password"} placeholder={placeholder} className="w-full border-2 border-black" name={name} value={value} onChange={onChange} required />

                <button className="absolute right-1 text-blue-800 hover:text-blue-700" onClick={toggleShowPassword} type="button">
                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </button>
            </div>
        </>

    )
}