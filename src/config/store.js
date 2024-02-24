import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './boardSlice'
import playerReducer from './playerSlice'
import botReducer from './botSlice'

export default configureStore({
    reducer: {
        board: boardReducer,
        player: playerReducer,
        bot: botReducer
    }
})