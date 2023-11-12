// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlayer, updateIsAdvancedMode, updateClue, randomizePlayers } from "../config/boardSlice";

import { InputLabel, Select, MenuItem, Switch, FormControl, FormControlLabel, Stack, TextField } from "@mui/material";


function PlayersSetup() {

    const dispatch = useDispatch()
    const players = useSelector(s => s.board.players)
    const isAdvancedMode = useSelector(s => s.board.isAdvancedMode)

    const playerSelectChange = (key) => {
        return e => dispatch(updatePlayer({ key, type: e.target.value }))
    }

    const botClueChange = (key) => {
        return e => {
            console.log(e.target.value)
            dispatch(updateClue({key, clueNumber: e.target.value}))
        }
    }

    let playerSelects = []
    for (let key in players){
        let { name, type, clueNumber } = players[key]
        let id = key + "-player-select"
        let labelId = id + "-label"
        let color = name.replaceAll(" ", "").toLowerCase()
        let isVisible = type === "bot" ? "visible" : "hidden"

        playerSelects.push(
            <div className="player-select-container" key={id}>
                <FormControl
                    variant="filled"
                    sx={{width: 200}}
                >
                    <InputLabel id={labelId+"color"}
                        sx={{ color: color }}
                    >
                        {name}
                    </InputLabel>
                    <Select labelId={labelId+"color"}
                        sx={{color: "white"}}
                        value={type}
                        onChange={playerSelectChange(key)}
                        label={name}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="player">Player</MenuItem>
                        <MenuItem value="bot">Bot</MenuItem>
                    </Select>
                </FormControl>

                <TextField label="Clue Number" variant="outlined"
                    sx={{visibility: isVisible}}
                    value={clueNumber === null ? "" : clueNumber}
                    onChange={botClueChange(key)}
                    placeholder="number between 1 & 96"
                />

            </div>
        )
    }

    const randomizePlayersButtonClick = e => {
        dispatch(randomizePlayers())
    }

    return <div className="player-setup">
        <button onClick={randomizePlayersButtonClick}>randomizePlayers</button>

        <Stack spacing={1}>
            { playerSelects }
        </Stack>

        <FormControlLabel
            control={<Switch
                checked={isAdvancedMode}
                onChange={e => {
                    dispatch(updateIsAdvancedMode(e.target.checked))
                }}
            />}
            label="Advanced Mode"
        />
    </div>
}

export default PlayersSetup