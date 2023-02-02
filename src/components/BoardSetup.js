import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { slotDraggingChunk, updateDraggingChunk } from "../config/boardSlice"
import MapChunk from "./MapChunk"
import Ruler from "./Ruler"
import Data from '../utils/data'

export default function BoardSetup() {
    // ducks
    const dispatch = useDispatch()
    const boardSetup = useSelector(s => s.board.boardSetup),
        draggingChunk = useSelector(s => s.board.draggingChunk),
        availableChunks = useSelector(s => s.board.availableChunks),
        isAdvancedMode = useSelector(s => s.board.isAdvancedMode),
        structureData = useSelector(s => s.board.structures)


    // state
    const [mapChunksDone, setMapChunksDone] = useState(false)

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
    
    let structures = structureData
        .map(structure => {
            let { id, name, image, chunkId } = structure
            let hidden = id.includes("black") ? !isAdvancedMode : chunkId !== null
            return (
                <div className="structure" key={id}
                    draggable="true"
                    hidden={hidden}
                    onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", id)
                    }}
                >
                    {/* <p>{name}</p> */}
                    <img alt={name} src={image}/>
                </div>
            )
        })

    let mapChunks = boardSetup
        .map((chunk, index) => {
            return (
                <MapChunk key={index} chunkId={chunk.chunkId} index={index} rotated={chunk.rotated} />
            )
        })

    let title = mapChunksDone ? "Place Structures" : "Place Map Chunks"

    return (
        <div className="BoardSetup">
            <h1>{title}</h1>
            {/* <Ruler numTicks={21} spaceBetween={25} unit={"px"} hasTallTicks={true} tallTickSpacing={4} marginLeft={"60px"}/> */}
            <button onClick={() => {
                if (!mapChunksDone){
                    setMapChunksDone(true)
                }
            }}>{mapChunksDone ? "Done placing Structures" : "Done placing Map Chunks"}</button>

            <div className="board-container">

                {
                    mapChunksDone ?
                    <div className="structures-container">
                        { structures }
                    </div>
                    :
                    <div className="numbers-container">
                        { draggableNumbers }
                    </div>
                }

                <div className="chunks-container">
                    { mapChunks }
                </div>


            </div>


        </div>
    )
}