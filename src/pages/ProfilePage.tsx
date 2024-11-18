import { useAppSelector } from "../app/hooks";
import Heading2 from "../Components/Heading2";
import { Button } from "../Components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { userDataUpdate } from "../features/Users/userSlice";

export default function ProfilePage() {

    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        const response = await axios.get('/logout', { withCredentials: true });
        const userData = {
            "email": "", "username": ""
        }
        navigate('/login');
        dispatch(userDataUpdate(userData));

    }

    return (
        <>
            <Heading2 text="User Account Settings" />
            <div>{user.username}</div>
            <div>{user.email}</div>
            <Button text="Logout" type="button" handleClick={handleLogout} />
        </>
    )
}