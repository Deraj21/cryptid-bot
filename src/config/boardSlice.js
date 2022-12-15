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
        boardSetup: [
            { chunkId: null, rotated: false },
            { chunkId: null, rotated: false },
            { chunkId: null, rotated: false },
            { chunkId: null, rotated: false },
            { chunkId: null, rotated: false },
            { chunkId: null, rotated: false },
        ],
        availableChunks: [ 0, 1, 2, 3, 4, 5 ],
        draggingChunk: null,
        isAdvancedMode: false
    },
    reducers: {
        updatePlayer: (state, action) => {
            state.players[action.payload.key].type = action.payload.type
        },
        slotDraggingChunk: (state, action) => {
            state.boardSetup[action.payload].chunkId = state.draggingChunk
            let i = state.availableChunks.findIndex(v => v === state.draggingChunk)
            if (i !== -1) {
                state.availableChunks.splice(i, 1)
            }
            state.draggingChunk = null
        },
        removeChunk: (state, action) => {
            state.boardSetup[action.payload].chunkId = null
        },
        rotateChunk: (state, action) => {
            let i = state.boardSetup.findIndex(val => val.chunkId === action.payload)
            state.boardSetup[i].rotated = !state.boardSetup[i].rotated
        },
        updateDraggingChunk: (state, action) => {
            state.draggingChunk = action.payload
        },
        updateIsAdvancedMode: (s, a) => {
            s.isAdvancedMode = a.payload
        }
    }
})

export const { updatePlayer, slotDraggingChunk, removeChunk, rotateChunk, updateDraggingChunk, updateIsAdvancedMode } = boardSlice.actions

export default boardSlice.reducer

/*

*/