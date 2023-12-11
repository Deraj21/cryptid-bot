import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { slotDraggingChunk, updateDraggingChunk, finishPlacingChunks, finishPlacingStructures, setDraggingStructure, setHexData, randomizeBoard } from "../config/boardSlice"
import { setClues } from "../config/playerSlice"

import MapChunk from "./MapChunk"
import Ruler from "./Ruler"
import dataHelper from "../utils/data"

export default function BoardSetup() {
    // redux
    const dispatch = useDispatch()
    const isAdvancedMode = useSelector(s => s.board.isAdvancedMode),
        structures = useSelector(s => s.board.structures),
        donePlacingChunks = useSelector(s => s.board.donePlacingChunks)
    let mapChunks = useSelector(s => s.board.mapChunks)
    let players = useSelector(s => s.player.players)

    // react-router
    let navigate = useNavigate()

    let unplacedMapPieces = mapChunks
        .filter(chunk => chunk.placed === null)
        .map((piece, i) => {
            return (
                <div key={`key${i}`}
                    draggable="true"
                    className="unplaced-map-piece"
                    onDragStart={ e => {
                        dispatch(updateDraggingChunk(piece.id))
                    }}
                >
                    <img src={piece.image} alt="map-piece-to-place" />
                    <p>{piece.id + 1}</p>
                </div>
            )
        })
    let placedMapPieces = [0, 1, 2, 3, 4, 5]
        .map(index => {
            let chunk = mapChunks.find(c => c.placed === index) || {}
            return <MapChunk key={index} index={index}
                chunkId={chunk.id !== undefined ? chunk.id : null}
                rotated={chunk.rotated || false }
                placed={chunk.placed || null}
                image={chunk.image || null}
            />
        })
    
    let unplacedStructures = structures
        .filter(struct => {
            if (struct.chunkId !== null)
            return false
            else if (struct.id.includes("black") && !isAdvancedMode)
                return false
            else
                return true
        })
        .map(structure => {
            let { id, name, image, chunkId } = structure
            return (
                <div className="structure" key={id}
                    draggable="true"
                    onDragStart={(e) => {
                        dispatch(setDraggingStructure(id))
                    }}
                    >
                    {/* <p>{name}</p> */}
                    <img alt={name} src={image}/>
                </div>
            )
        })
        
    let showDoneButton
    if (!donePlacingChunks){
        showDoneButton = unplacedMapPieces.length === 0
    } else {
        showDoneButton = unplacedStructures.length === 0
    }

    let placementLabel = !donePlacingChunks ? "Place Map Pieces" : "Place Structures"
    let doneButtonText = !donePlacingChunks ? "Done" : "Done (ready to play game)"

    return (
        <div className="BoardSetup">
            <h1>Setup Board</h1>
            {/* <button onClick={() => dispatch(randomizeBoard())} >Randomize Board</button> */}
            <div className="placement-container">
                <h3>{placementLabel}</h3>
                {
                    donePlacingChunks
                    ?
                    <div className="structures-container">
                        { unplacedStructures }
                    </div>
                    :
                    <div className="unplaced-map-pieces-container">
                        { unplacedMapPieces }
                    </div>
                }
                {
                    showDoneButton
                    ?
                    <button className="btn"
                        onClick={() => {
                            if (donePlacingChunks){
                                dispatch(finishPlacingStructures())

                                // convert to play data
                                let chunksCopy = [ ...mapChunks ]
                                let structuresCopy = [ ...structures ]

                                let hexes = dataHelper.convertSetupToPlay(chunksCopy, structuresCopy)
                                
                                dispatch(setHexData(hexes))
                                dispatch(setClues(players))
                                navigate("/play")
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
                { placedMapPieces }
            </div>

        </div>
    )
}