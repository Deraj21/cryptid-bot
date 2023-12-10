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
            let number = a.payload.clueNumber
            if (typeof number === "number") {
                number = Math.max(1, a.payload.clueNumber)
                number = Math.min(96, a.payload.clueNumber)
            }
            s.players[a.payload.key].clueNumber = number
            
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

                if (player.type === "bot") {
                    player.clueNumber = data.randomIntBetween(0, 95)
                }
            }
        }
    }
})

export const { updatePlayer, updateClue, setClues, randomizePlayers } = playerSlice.actions

export default playerSlice.reducer