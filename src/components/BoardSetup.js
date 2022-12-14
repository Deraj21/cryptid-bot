import { useSelector, useDispatch } from "react-redux"
import { slotDraggingChunk, updateDraggingChunk } from "../config/boardSlice"
import MapChunk from "./MapChunk"

export default function BoardSetup() {
    // ducks
    const boardSetup = useSelector(s => s.board.boardSetup)
    const draggingChunk = useSelector(s => s.board.draggingChunk)
    const availableChunks = useSelector(s => s.board.availableChunks)
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

    let mapChunks = boardSetup
        .map((chunk, index) => {
            return (
                <MapChunk key={index} chunkId={chunk.chunkId} index={index} rotated={chunk.rotated} />
            )
        })

    console.log(
        boardSetup.map(chunk => chunk.chunkId + " " + chunk.rotated).join('\n')
    )

    return (
        <div className="BoardSetup">
            <h1>Setup Board</h1>

            <div className="board-container" >

                <div className="numbers-container">
                    { draggableNumbers }
                </div>

                <div className="chunks-container">
                    { mapChunks }
                </div>

            </div>


        </div>
    )
}