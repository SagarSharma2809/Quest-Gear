import { useAppSelector } from "../app/hooks";
import Heading2 from "../Components/Heading2";
import { Button } from "../Components/Button";


export default function ProfilePage() {

    const user = useAppSelector(state => state.user);

    return (
        <>
            <Heading2 text="User Account Settings" />
            <div>{user.username}</div>
            <div>{user.email}</div>
            <Button text="Logout" type="button" />
        </>
    )
}