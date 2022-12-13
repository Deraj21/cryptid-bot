import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updatePlayer } from "../config/boardSlice"

import BoardSetup from "../components/BoardSetup"

export default function SetupPage() {

    const players = useSelector(s => s.board.players)
    const dispatch = useDispatch()
    
    let options = [
        { value: "",        name: "None" },
        { value: "player",  name: "Player" },
        { value: "bot",     name: "Bot" }
    ].map((option, i) => {
        return (
            <option key={`option-${i}`} value={option.value} >{option.name}</option>
        )
    })

    let selects = []
    for (let key in players){
        let { name, type } = players[key]
        let id = key + "-select"
        selects.push(
            <div key={`select-${key}`} className="select-block">
                <label htmlFor={id}>{name}</label>

                <select id={id}
                    onChange={ e => {
                        dispatch(updatePlayer({
                            key: key,
                            type: e.target.value
                        }))
                    } }
                >
                    { options }
                </select>
            </div>
        )
    }

    return (
        <div className="SetupPage" >
            <h1>Setup Players</h1>
            <div className="player-setup">
                { selects }
            </div>

            <BoardSetup />
        </div>
    )
}