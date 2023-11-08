import { createSlice, current } from "@reduxjs/toolkit";

import dataHelper from "../utils/data"
import { dummyHexes } from "../data/dummyData";
import { dummyMapPeices } from "../data/dummyData";

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

const flipCoin = () => !!Math.floor(Math.random() * 2)

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
        mapChunks: [0, 1, 2, 3, 4, 5].map(id => {
            return {
                id: id,
                placed: null,
                rotated: false,
                image: chunkImages[id]
            }
        }),
        draggingChunk: null,
        fromChunk: null,
        isAdvancedMode: false,
        draggingStructure: null,
        donePlacingChunks: false,
        donePlacingStructures: false,
        hexes: [],
        currentHex: {row: null, col: null}
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
        setMapChunks: (s, a) => {
            s.mapChunks = a.payload
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
        placeYesMarker: (s, a) => {
            // TODO: currently erroring
            let { row, col, color } = a.payload
            let oldMarkersList = s.hexes[row][col].yesMarkers
            oldMarkersList.push(color)
            s.hexes[row][col].yesMarkers = [ ...oldMarkersList ]
        },
        placeNoMarker: (s, a) => {
            let { row, col, color } = a.payload
        },
        setCurrentHex: (s, a) => {
            s.currentHex.row = a.payload.row
            s.currentHex.col = a.payload.col
        },
        randomizeBoard: (s, a) => {
            let availableSlots = [0, 1, 2, 3, 4, 5]
            // filter map chunks if it's already been placed
            let unplacedChunks = s.mapChunks.filter(chunk => {
                if (chunk.placed !== null) {
                    let i = availableSlots.findIndex(slot => slot == chunk.placed)
                    availableSlots.splice(i, 1)
                    return false
                }
                return true
            })

            // loop through unplaced, and assign random slot
            unplacedChunks.forEach(chunk => {
                let randomIndex = Math.floor(Math.random() * availableSlots.length)
                chunk.placed = availableSlots.splice(randomIndex, 1)[0]
                chunk.rotated = flipCoin()
            })

            s.donePlacingChunks = true

            let numRows = 3
            let numCols = 6

            // loop through structures
            s.structures.forEach((structure, i) => {
                let row = Math.floor(Math.random() * numRows)
                let col = Math.floor(Math.random() * numCols)
                structure.chunkId = i
                structure.coords = {row, col}
                structure.position = dataHelper.getScreenPositionFromCoordinates(row, col)
            })

            s.donePlacingStructures = true
        }
    }
})

export const { updatePlayer, slotDraggingChunk, setMapChunks, removeChunk, rotateChunk, updateDraggingChunk, updateIsAdvancedMode, placeStructure, finishPlacingChunks, finishPlacingStructures, setDraggingStructure, setHexData, placeYesMarker, placeNoMarker, setCurrentHex, randomizeBoard } = boardSlice.actions

export default boardSlice.reducer

/*

*/