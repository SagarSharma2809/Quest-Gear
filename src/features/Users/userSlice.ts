import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userDataProp {
    "username": string,
    "email": string
}

const initialState: userDataProp = {
    "username": "",
    "email": ""
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