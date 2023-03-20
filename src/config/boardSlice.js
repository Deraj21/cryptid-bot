import { createSlice } from "@reduxjs/toolkit";

import dataHelper from "../utils/data"

// structure images
import p1 from "../media/structures/p1.png"
import p2 from "../media/structures/p2.png"
import p3 from "../media/structures/p3.png"
import p4 from "../media/structures/p4.png"
import s1 from "../media/structures/s1.png"
import s2 from "../media/structures/s2.png"
import s3 from "../media/structures/s3.png"
import s4 from "../media/structures/s4.png"

import chunk_image_0 from "../media/board-chunks/0.png"
import chunk_image_1 from "../media/board-chunks/1.png"
import chunk_image_2 from "../media/board-chunks/2.png"
import chunk_image_3 from "../media/board-chunks/3.png"
import chunk_image_4 from "../media/board-chunks/4.png"
import chunk_image_5 from "../media/board-chunks/5.png"
let chunkImages = [ chunk_image_0, chunk_image_1, chunk_image_2, chunk_image_3, chunk_image_4, chunk_image_5 ]

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
        mapChunks: [
            {
                id: 0,
                placed: null,
                rotated: false,
                image: chunkImages[0]
            },
            {
                id: 1,
                placed: null,
                rotated: false,
                image: chunkImages[1]
            },
            {
                id: 2,
                placed: null,
                rotated: false,
                image: chunkImages[2]
            },
            {
                id: 3,
                placed: null,
                rotated: false,
                image: chunkImages[3]
            },
            {
                id: 4,
                placed: null,
                rotated: false,
                image: chunkImages[4]
            },
            {
                id: 5,
                placed: null,
                rotated: false,
                image: chunkImages[5]
            }
        ],
        draggingChunk: null,
        fromChunk: null,
        isAdvancedMode: false,
        draggingStructure: null,
        donePlacingChunks: false,
        donePlacingStructures: false,
        hexes: null
    },
    reducers: {
        updatePlayer: (state, action) => {
            state.players[action.payload.key].type = action.payload.type
        },
        slotDraggingChunk: (s, a) => {
            s.mapChunks[s.draggingChunk].placed = a.payload
            s.draggingChunk = null
        },
        removeChunk: (state, action) => {
            state.mapChunks.find(mapChunk => action.payload === mapChunk.placed).placed = null
        },
        rotateChunk: (s, a) => {
            let chunk = s.mapChunks.find(chunk => chunk.id === a.payload)
            chunk.rotated = !chunk.rotated
        },
        updateDraggingChunk: (state, action) => {
            state.draggingChunk = action.payload
        },
        updateIsAdvancedMode: (s, a) => {
            s.isAdvancedMode = a.payload
        },
        setDraggingStructure: (s, a) => {
            s.draggingStructure = a.payload
        },
        placeStructure: (s, a) => {
            let { id, chunkId, coords, position } = a.payload
            let structure = s.structures.find(struct => struct.id === id)
            structure.chunkId = chunkId
            structure.coords = { ...coords }
            structure.position = { ...position }
            s.draggingStructure = null
        },
        removeStructure: (s, a) => {
            let structure = s.structures.find(struct => struct.id === a.payload)
            structure.chunkId = null
            structure.coords = null
            structure.position = null
        },
        finishPlacingChunks: (s) => {
            s.donePlacingChunks = true
        },
        finishPlacingStructures: (s) => {
            s.donePlacingStructures = true
        },
        setHexData: (s, a) => {
            s.hexes = a.payload
        },
        placeYes: (s, a) => {
            
        },
        placeNo: (s, a) => {

        }
    }
})

export const { updatePlayer, slotDraggingChunk, removeChunk, rotateChunk, updateDraggingChunk, updateIsAdvancedMode, placeStructure, finishPlacingChunks, finishPlacingStructures, setDraggingStructure, setHexData, placeYes, placeNo } = boardSlice.actions

export default boardSlice.reducer

/*

*/