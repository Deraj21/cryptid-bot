import { createSlice } from "@reduxjs/toolkit";

// structure images
import p1 from "../media/structures/p1.png"
import p2 from "../media/structures/p2.png"
import p3 from "../media/structures/p3.png"
import p4 from "../media/structures/p4.png"
import s1 from "../media/structures/s1.png"
import s2 from "../media/structures/s2.png"
import s3 from "../media/structures/s3.png"
import s4 from "../media/structures/s4.png"

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
        structures: [
            {
                id: "as-white",
                name: "Abandoned Shack, White",
                image: p1,
                chunkId: null,
                coords: null,
                position: null
            },
            {
                id: "ss-white",
                name: "Standing Stone, White",
                image: s1,
                chunkId: null,
                coords: null,
                position: null
            },
            {
                id: "as-green",
                name: "Abandoned Shack, Green",
                image: p2,
                chunkId: null,
                coords: null,
                position: null
            },
            {
                id: "ss-green",
                name: "Standing Stone, Green",
                image: s2,
                chunkId: null,
                coords: null,
                position: null
            },
            {
                id: "as-blue",
                name: "Abandoned Shack, Blue",
                image: p3,
                chunkId: null,
                coords: null,
                position: null
            },
            {
                id: "ss-blue",
                name: "Standing Stone, Blue",
                image: s3,
                chunkId: null,
                coords: null,
                position: null
            },
            {
                id: "as-black",
                name: "Abandoned Shack, Black",
                image: p4,
                chunkId: null,
                coords: null,
                position: null
            },
            {
                id: "ss-black",
                name: "Standing Stone, Black",
                image: s4,
                chunkId: null,
                coords: null,
                position: null
            },
        ],
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
        },
        placeStructure: (s, a) => {
            let { id, chunkId, coords, position } = a.payload
            let structure = s.structures.find(struct => struct.id === id)
            structure.chunkId = chunkId
            structure.coords = { ...coords }
            structure.position = { ...position }
        },
        removeStructure: (s, a) => {
            let structure = s.structures.find(struct => struct.id === a.payload)
            structure.chunkId = null
            structure.coords = null
            structure.position = null
        }
    }
})

export const { updatePlayer, slotDraggingChunk, removeChunk, rotateChunk, updateDraggingChunk, updateIsAdvancedMode, placeStructure } = boardSlice.actions

export default boardSlice.reducer

/*

*/