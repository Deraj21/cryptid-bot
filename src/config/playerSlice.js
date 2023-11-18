import { createSlice } from "@reduxjs/toolkit"

import data from "../utils/data"

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        players: {
            red: {
                name: "Red",
                type: "", // 'player' | 'bot'
                clueNumber: ""
            },
            teal: {
                name: "Teal",
                type: "",
                clueNumber: ""
            },
            orange: {
                name: "Orange",
                type: "",
                clueNumber: ""
            },
            purple: {
                name: "Purple",
                type: "",
                clueNumber: ""
            },
            blue: {
                name: "Light Blue",
                type: "",
                clueNumber: ""
            }
        },
        botClues: {}
    },
    reducers: {
        updatePlayer: (state, action) => {
            state.players[action.payload.key].type = action.payload.type
            if (action.payload.type !== "bot"){
                state.players[action.payload.key].clueNumber = ""
            }
        },
        updateClue: (s, a) => {
            s.players[a.payload.key].clueNumber = a.payload.clueNumber
        },
        setClues: (s, a) => {
            let players = a.payload
            for (let key in players){
                let { clueNumber } = players[key]
                if (clueNumber){
                    let parsed = data.parseClue(key, parseInt(clueNumber))
                    s.botClues[key] = { ...parsed }
                }
            }
        },
        randomizePlayers: (s, a) => {
            for (let key in s.players){
                let player = s.players[key]
                player.type = (key === "purple") ? "bot" : "player"
            }
        }
    }
})

export const { updatePlayer, updateClue, setClues, randomizePlayers } = playerSlice.actions

export default playerSlice.reducer