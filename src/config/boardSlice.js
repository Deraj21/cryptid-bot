import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        players: {
            red: {
                name: "Red",
                type: "" // 'player' | 'bot'
            },
            teal: {
                name: "Teal",
                type: ""
            },
            orange: {
                name: "Orange",
                type: ""
            },
            purple: {
                name: "Purple",
                type: ""
            },
            blue: {
                name: "Light Blue",
                type: ""
            }
        },
        boardSetup: [ null, null, null, null, null, null ],
        availableChunks: [ 0, 1, 2, 3, 4, 5 ],
        draggingChunk: null
    },
    reducers: {
        updatePlayer: (state, action) => {
            state.players[action.payload.key].type = action.payload.type
        },
        slotDraggingChunk: (state, action) => {
            state.boardSetup[action.payload] = state.draggingChunk
            let i = state.availableChunks.findIndex(v => v === state.draggingChunk)
            state.availableChunks.splice(i, 1)
            state.draggingChunk = null
        },
        updateDraggingChunk: (state, action) => {
            state.draggingChunk = action.payload
        }
    }
})

export const { updatePlayer, slotDraggingChunk, updateDraggingChunk } = boardSlice.actions

export default boardSlice.reducer

/*

*/