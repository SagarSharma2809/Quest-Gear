import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

interface userDataProp {
    "username": string,
    "email": string
}

const userDataStr = Cookies.get('UserData');
const userData = userDataStr ? JSON.parse(userDataStr) : undefined;


const initialState: userDataProp = {

    "username": userData?.username || "",
    "email": userData?.email || ""
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userDataUpdate(state, action: PayloadAction<userDataProp>) {
            return { "username": action.payload.username, "email": action.payload.email }
        }
    }
})

export const { userDataUpdate } = UserSlice.actions;

export default UserSlice.reducer;