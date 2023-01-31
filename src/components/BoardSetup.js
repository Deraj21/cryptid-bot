import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { slotDraggingChunk, updateDraggingChunk } from "../config/boardSlice"
import MapChunk from "./MapChunk"
import Ruler from "./Ruler"

import p1 from "../media/structures/p1.png"
import p2 from "../media/structures/p2.png"
import p3 from "../media/structures/p3.png"
import p4 from "../media/structures/p4.png"
import s1 from "../media/structures/s1.png"
import s2 from "../media/structures/s2.png"
import s3 from "../media/structures/s3.png"
import s4 from "../media/structures/s4.png"

const structureData = [
    {
        id: "as-white",
        name: "Abandoned Shack, White",
        image: p1
    },
    {
        id: "ss-white",
        name: "Standing Stone, White",
        image: s1
    },
    {
        id: "as-green",
        name: "Abandoned Shack, Green",
        image: p2
    },
    {
        id: "ss-green",
        name: "Standing Stone, Green",
        image: s2
    },
    {
        id: "as-blue",
        name: "Abandoned Shack, Blue",
        image: p3
    },
    {
        id: "ss-blue",
        name: "Standing Stone, Blue",
        image: s3
    },
    {
        id: "as-black",
        name: "Abandoned Shack, Black",
        image: p4
    },
    {
        id: "ss-black",
        name: "Standing Stone, Black",
        image: s4
    },
]

export default function BoardSetup() {
    // ducks
    const boardSetup = useSelector(s => s.board.boardSetup)
    const draggingChunk = useSelector(s => s.board.draggingChunk)
    const availableChunks = useSelector(s => s.board.availableChunks)
    const isAdvancedMode = useSelector(s => s.board.isAdvancedMode)
    const dispatch = useDispatch()

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
            let { id, name, image } = structure
            return (
                <div className="structure" key={id}
                    draggable="true"
                    hidden={id.includes("black") ? !isAdvancedMode : false}
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

    return (
        <div className="BoardSetup">
            <h1>Setup Board</h1>
            {/* <Ruler numTicks={21} spaceBetween={25} unit={"px"} hasTallTicks={true} tallTickSpacing={4} marginLeft={"60px"}/> */}

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