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

import p1 from "../media/structures/p1.png"

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

            onDragOver={e => {
                e.preventDefault()
                let x = e.nativeEvent.offsetX
                let y = e.nativeEvent.offsetY
                let H = e.target.height
                let h = H / 7
                let W = e.target.width
                let w = W / 9.5

                let r = Math.floor( w * Math.sin(60 / 180 * Math.PI) )



                console.log(r)

                // console.log(e.target.height)
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
            }}
            onDrop={e => {
                let x = e.clientX - e.target.x
                let y = e.clientY - e.target.y
                console.log(`${x}, ${e.clientX}, ${e.target.x}`)

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
                // TODO: update state with rotation
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
                <div className="chunk-image-placeholder"
                    src={placeholderChunk}
                    alt="placeholder-chunk"
                    draggable={""+!droppable}
                    style={{
                        background: `${15}px ${12}px no-repeat url(${p1}),
                        no-repeat url(${placeholderChunk})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '10px 10px'
                    }}

            // background: center / contain no-repeat url("../../media/examples/firefox-logo.svg"),
            // #eee 35% url("../../media/examples/lizard.png");
                ></div>
            }

        </div>
    )
}