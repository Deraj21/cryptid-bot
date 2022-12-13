import { useSelector, useDispatch } from "react-redux"
import { slotDraggingChunk, updateDraggingChunk } from "../config/boardSlice"

export default function BoardSetup() {
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
                    onDragStart={ e => { dispatch(updateDraggingChunk(n)) } }
                >
                    <p>{n + 1}</p>
                </div>
            )
        })

    let mapChunks = boardSetup
        .map((chunk, index) => {
            return (
                <div className="map-chunk"
                    droppable="true"
                    id={`mapchunk-${chunk}`} key={`key-${index}`}
                    style={{ backgroundImage: chunk ? `url(../media/board-chunks/${1}.png)` : ''}}
                    onDragEnter={e => e.preventDefault()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                        dispatch(slotDraggingChunk(index))
                    }}
                >
                    <p>{chunk !== null ? chunk+1 : ''}</p>
                </div>
            )
        })

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