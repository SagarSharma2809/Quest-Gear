import PasswordInput from "../Components/PasswordInput";
import { Button } from "../Components/Button";

interface inputDataProps {
    username: string;
    email: string
    pass: string;
    confirm: string
}

interface InputFormProps {
    inputData: inputDataProps;
    onChange: (e: any) => void;
    onSubmit: (e: any) => void;
    type: string;

}

export default function InputForm({ inputData, onChange, onSubmit, type }: InputFormProps) {

    return (
        <>
            <form action="" className="flex flex-col md:w-2/3 justify-center items-center gap-2 p-4 m-4" onSubmit={onSubmit}>
                <input type="text" placeholder="Enter a Username" className="w-full border-2 border-black" name="username" value={inputData.username} onChange={onChange} required />

                {type == "signup" &&
                    <input type="email" placeholder="Enter Email" className="w-full border-2 border-black" name="email" value={inputData.email} onChange={onChange} autoComplete="off" required />
                }

                <PasswordInput name="pass" placeholder="Enter your password..." value={inputData.pass} onChange={onChange} />

                {type == "signup" &&
                    <PasswordInput name="confirm" placeholder="Confirm password" value={inputData.confirm} onChange={onChange} />
                }

                <Button text={type == "signup" ? "Sign Up" : "Log In"} type="submit" />
            </form>

        </>
    )
}