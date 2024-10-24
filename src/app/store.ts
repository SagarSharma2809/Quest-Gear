import { configureStore } from '@reduxjs/toolkit'
import characterReducer from '../features/Character/characterSlice'
import CurrentCharacterReducer from '../features/Character/CurrentCharacterSlice'
import UserSliceReducer from '../features/Users/userSlice'

export const store = configureStore({
    reducer: {
        characters: characterReducer,
        current: CurrentCharacterReducer,
        user: UserSliceReducer
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>