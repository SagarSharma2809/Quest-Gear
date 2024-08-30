import { createSlice, PayloadAction } from '@reduxjs/toolkit'




const initialState: number = 0;

const CurrentCharacterSlice = createSlice({
    name: 'current',
    initialState,
    reducers: {
        currentUpdated(state, action: PayloadAction<number>) {
            return action.payload;
        }
    }

})

export const { currentUpdated } = CurrentCharacterSlice.actions;

export default CurrentCharacterSlice.reducer;