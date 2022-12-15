import { useSelector, useDispatch } from "react-redux"
import { slotDraggingChunk, updateDraggingChunk } from "../config/boardSlice"
import MapChunk from "./MapChunk"

export default function BoardSetup() {
    // ducks
    const boardSetup = useSelector(s => s.board.boardSetup)
    const draggingChunk = useSelector(s => s.board.draggingChunk)
    const availableChunks = useSelector(s => s.board.availableChunks)
    const isAdvancedMode = useSelector(s => s.board.isAdvancedMode)
    const dispatch = useDispatch()

    let draggableNumbers = availableChunks
        .map((n, i) => {
            return (
                <div key={`key${i}`}
                    draggable="true"
                    className="draggable-number"
                    onDragStart={ e => {
                        dispatch(updateDraggingChunk(n))
                        e.dataTransfer.setData("text/plain", "")
                    }}
                >
                    <p>{n + 1}</p>
                </div>
            )
        })
    
    let structureNames = [
        "white tri",
        "white hex",
        "green tri",
        "green hex",
        "blue  tri",
        "blue  hex",
        "black tri",
        "black hex"
    ]
    let structures = structureNames
        .map(structure => {
            console.log(structure.includes("black"))
            return (
                <div className="structure"
                    draggable="true"
                    hidden={structure.includes("black") ? !isAdvancedMode : false}
                >
                    <p>{structure}</p>
                </div>
            )
        })

    let mapChunks = boardSetup
        .map((chunk, index) => {
            return (
                <MapChunk key={index} chunkId={chunk.chunkId} index={index} rotated={chunk.rotated} />
            )
        })

    return (
        <div className="BoardSetup">
            <h1>Setup Board</h1>

            <div className="board-container">

                <div className="numbers-container">
                    { draggableNumbers }
                </div>

                <div className="chunks-container">
                    { mapChunks }
                </div>

                <div className="structures-container">
                    { structures }
                </div>

            </div>


        </div>
    )
}