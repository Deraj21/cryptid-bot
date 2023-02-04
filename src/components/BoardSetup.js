import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { slotDraggingChunk, updateDraggingChunk, finishPlacingChunks, finishPlacingStructures } from "../config/boardSlice"
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
        structureData = useSelector(s => s.board.structures),
        donePlacingChunks = useSelector(s => s.board.donePlacingChunks)


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
    
    let showDoneButton = true
    let structures = structureData
        .map(structure => {
            let { id, name, image, chunkId } = structure
            let hidden = id.includes("black") ? (!isAdvancedMode && chunkId !== null) : chunkId !== null
            if (!hidden){
                showDoneButton = false
            }
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

    let placementLabel = !donePlacingChunks ? "Place Map Pieces" : "Place Structures"
    let doneButtonText = !donePlacingChunks ? "Done" : "Done (ready to play game)"
    showDoneButton = (!donePlacingChunks && availableChunks.length === 0) || (showDoneButton && donePlacingChunks)

    return (
        <div className="BoardSetup">
            <h1>Setup Board</h1>
            <div className="placement-container">
                <h3>{placementLabel}</h3>
                {
                    donePlacingChunks
                    ?
                    <div className="structures-container">
                        { structures }
                    </div>
                    :
                    <div className="numbers-container">
                        { draggableNumbers }
                    </div>
                }
                {
                    showDoneButton
                    ?
                    <button className="btn"
                        onClick={() => {
                            if (donePlacingChunks){
                                dispatch(finishPlacingStructures())
                            } else {
                                dispatch(finishPlacingChunks())
                            }
                        }}
                    >{doneButtonText}</button>
                    :
                    ''
                }
            </div>

            <div className="chunks-container">
                { mapChunks }
            </div>

        </div>
    )
}