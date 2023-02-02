import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { slotDraggingChunk, updateDraggingChunk, removeChunk, rotateChunk, placeStructure } from "../config/boardSlice"

import chunk_image_0 from "../media/board-chunks/0.png"
import chunk_image_1 from "../media/board-chunks/1.png"
import chunk_image_2 from "../media/board-chunks/2.png"
import chunk_image_3 from "../media/board-chunks/3.png"
import chunk_image_4 from "../media/board-chunks/4.png"
import chunk_image_5 from "../media/board-chunks/5.png"
import placeholderChunk from "../media/board-chunks/placeholder.png"

import p1 from "../media/structures/p1.png"
import mask from '../media/mask.png'
import redDot from '../media/red-dot.png'

const chunkImages = [ chunk_image_0, chunk_image_1, chunk_image_2, chunk_image_3, chunk_image_4, chunk_image_5 ]
const MASK_WIDTH = 54
const MASK_HEIGHT = 48
const STRUCTURE_WIDTH = 24
const STRUCTURE_HEIGHT = 24

export default function MapChunk(props) {
    // ducks
    const dispatch = useDispatch()
    const draggingChunk = useSelector(s => s.board.draggingChunk)
    const structures = useSelector(s => s.board.structures)

    // local state
    const [droppable, setDroppable] = useState(true)
    const [maskPosition, setMaskPosition] = useState({x: null, y: null})
    const [maskCoords, setMaskCoords] = useState({row: null, col: null})

    // props
    const { chunkId, index, rotated } = props
    
    // create background image
    let background = ''
    if (maskPosition.x !== null) {
        background += `${maskPosition.x - MASK_WIDTH / 2}px ${maskPosition.y - MASK_HEIGHT / 2}px no-repeat url(${mask}), `
    }

    structures.map(structure => {
        if (chunkId && structure.chunkId === chunkId){
            let { x, y } = structure.position
            let posX = x - STRUCTURE_WIDTH / 2
            let posY = y - STRUCTURE_HEIGHT / 2
            background += `${posX}px ${posY}px no-repeat url(${structure.image}), `
        }
    })

    background += `no-repeat url(${chunkImages[chunkId]})`

    return (
        <div className="map-chunk"
            droppable={""+droppable}
            key={`${index}`}

            onDragOver={e => {
                e.preventDefault()
                let x = e.nativeEvent.offsetX
                let y = e.nativeEvent.offsetY
                let H = 160 // e.target.height
                let h = H / 7
                let W = 250 // e.target.width
                let w = W / 9.5

                let r = Math.floor( w * Math.sin(60 / 180 * Math.PI) )

                for (let col = 0; col < 6; col++){
                    for (let row = 0; row < 3; row++) {
                        let px = col * 1.5 * w + w
                        let py = col % 2 === 0 ? row * 2 * h + h : row * 2 * h + (2 * h)

                        let d = Math.sqrt( Math.pow(x - px, 2) + Math.pow(y - py, 2) )
                        if (d < r) {
                            setMaskPosition({x: px, y: py})
                            setMaskCoords({row, col})
                            return
                        }
                    }
                }
            }}
            onDragStart={ e => {
                dispatch(updateDraggingChunk(chunkId))
                e.dataTransfer.setData("text/plain", index)
                setDroppable(true)
            }}
            onDragEnter={e => {
                e.preventDefault()
                e.target.classList.add("draggedOver")
            }}
            onDragLeave={e => {
                e.target.classList.remove("draggedOver")
                setMaskPosition({x: null, y: null})
                setMaskCoords({row: null, col: null})
            }}
            onDrop={e => {
                // TODO: sus out if structure or map chunk
                let dataTransfer = e.dataTransfer.getData("text/plain")

                if (draggingChunk !== null && droppable) {
                    dispatch(slotDraggingChunk(index))
                    setDroppable(false)
                    if (dataTransfer !== "" && dataTransfer !== index) {
                        dispatch(removeChunk(dataTransfer))
                    }
                } else if (!droppable && dataTransfer !== '') {
                    dispatch(placeStructure({
                        id: dataTransfer,
                        chunkId: chunkId,
                        position: maskPosition,
                        coords: maskCoords
                    }))
                }

                setMaskPosition({x: null, y: null})
                setMaskCoords({row: null, col: null})
            }}
            onClick={e => {
                e.target.classList.toggle("rotated")
                // BUG: weird rotation behavior
                dispatch(rotateChunk(chunkId))
            }}
        >
            {
                chunkId !== null
                ?
                <div className={`chunk-image${rotated ? " rotated" : ""}`}
                    style={{
                        background: background
                    }}
                    draggable={""+!droppable}
                />
                :
                <div className="chunk-image-placeholder"
                    alt="placeholder-chunk"
                    draggable={""+!droppable}
                    style={{
                        background: `no-repeat url(${placeholderChunk})`,
                        backgroundRepeat: 'no-repeat',
                    }}
                ></div>
            }

        </div>
    )
}