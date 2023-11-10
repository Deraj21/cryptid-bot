import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateIsAdvancedMode } from "../config/boardSlice"
import { Switch, FormControl, FormControlLabel } from '@mui/material'

import BoardSetup from "../components/BoardSetup"
import PlayersSetup from "../components/PlayersSetup"

export default function SetupPage() {
    return (
        <div className="SetupPage" >
            <h1>Setup Players</h1>
            <PlayersSetup />
            
            <hr/>

            <BoardSetup />
        </div>
    )
}