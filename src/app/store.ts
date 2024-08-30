import { configureStore } from '@reduxjs/toolkit'
import characterReducer from '../features/Character/characterSlice'
import CurrentCharacterReducer from '../features/Character/CurrentCharacterSlice'

export const store = configureStore({
    reducer: {
        characters: characterReducer,
        current: CurrentCharacterReducer
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>