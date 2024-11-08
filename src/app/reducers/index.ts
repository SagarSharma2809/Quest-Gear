import { combineReducers } from '@reduxjs/toolkit'
import character from '../../features/Character/characterSlice'
import currentCharacter from '../../features/Character/CurrentCharacterSlice'
import user from '../../features/Users/userSlice'

export default combineReducers({
    character,
    currentCharacter,
    user
})