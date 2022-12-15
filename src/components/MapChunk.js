import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { slotDraggingChunk, updateDraggingChunk, removeChunk, rotateChunk } from "../config/boardSlice"

import chunk_image_0 from "../media/board-chunks/0.png"
import chunk_image_1 from "../media/board-chunks/1.png"
import chunk_image_2 from "../media/board-chunks/2.png"
import chunk_image_3 from "../media/board-chunks/3.png"
import chunk_image_4 from "../media/board-chunks/4.png"
import chunk_image_5 from "../media/board-chunks/5.png"
import placeholderChunk from "../media/board-chunks/placeholder.png"

const chunkImages = [ chunk_image_0, chunk_image_1, chunk_image_2, chunk_image_3, chunk_image_4, chunk_image_5 ]

export default function MapChunk(props) {
    // ducks
    const dispatch = useDispatch()

    // local state
    const [droppable, setDroppable] = useState(true)

    // props
    const { chunkId, index, rotated } = props

    return (
        <div className="map-chunk"
            droppable={""+droppable}
            key={`${index}`}

            onDragOver={e => e.preventDefault()}
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
            }}
            onDrop={e => {
                if(droppable) {
                    dispatch(slotDraggingChunk(index))
                    setDroppable(false)
                    let fromId = e.dataTransfer.getData("text/plain")
                    if (fromId != "" && fromId != index) {
                        dispatch(removeChunk(fromId))
                    }
                } else {
                    // nothing?
                }
            }}
            onClick={e => {
                e.target.classList.toggle("rotated")
                // dispatch(rotateChunk(chunkId))
            }}
        >
            {
                chunkId !== null
                ?
                <img className={`chunk-image${rotated ? " rotated" : ""}`}
                    src={chunkImages[chunkId]}
                    alt="map-chunk"
                    draggable={""+!droppable}
                />
                :
                <img className="chunk-image-placehoder"
                    src={placeholderChunk}
                    alt="placeholder-chunk"
                    draggable={""+!droppable}
                />
            }

        </div>
    )
}