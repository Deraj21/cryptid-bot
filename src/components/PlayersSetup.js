// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlayer, updateIsAdvancedMode } from "../config/boardSlice";

import { InputLabel, Select, MenuItem, Switch, FormControl, FormControlLabel, Stack } from "@mui/material";


function PlayersSetup() {

    const dispatch = useDispatch()
    const players = useSelector(s => s.board.players)
    const isAdvancedMode = useSelector(s => s.board.isAdvancedMode)

    const playerSelectChange = (key) => {
        return e => dispatch(updatePlayer({ key, type: e.target.value }))
    }

    let playerSelects = []
    for (let key in players){
        let { name, type } = players[key]
        let id = key + "-player-select"
        let labelId = id + "-label"
        let color = name.replaceAll(" ", "").toLowerCase()
        console.log(color)

        playerSelects.push(
            <FormControl key={"fc-player-" + key}
                variant="filled"
                sx={{width: 200}}
            >
                <InputLabel id={labelId}
                    sx={{ color: color }}
                >{name}</InputLabel>
                <Select labelId={labelId}
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
        )
    }

    return <div className="player-setup">

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