import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import CanvasBoardHelper from "../utils/CanvasBoardHelper";

const canvasId = "cryptid-board-canvas"

export default function PlayingBoard() {

    let hexes = useSelector(s => s.board.hexes)
    let peices = useSelector(s => s.board.mapChunks)
    const [canvasHelper, setCanvasHelper] = useState(null)
    const [redrawTrigger, redraw] = useState(false)

    const h = 600
    const w = 600
    
    const canvasRef = useRef(null)

    useEffect(() => {
        let canvas = canvasRef.current
        // create board helper
        if (!canvasHelper){
            setCanvasHelper( new CanvasBoardHelper(canvas) )
        } else {
            // draw the board initially
            canvasHelper.draw([ ...peices ], [ ...hexes ])
        }

        if (redraw)
            redraw(false)
    }, [canvasHelper, hexes, peices, redrawTrigger])

    // listen for when a user right-clicks
        // create menu (use material ui)
        // on click of menu item -> update board data & redraw board

    return (
        <div className="PlayingBoard">
            <canvas ref={canvasRef} id={canvasId}  height={h} width={w} >
                Oops. It seems that the canvas broke.
            </canvas>
            <button
                onClick={() => redraw(true)}
            >Redraw</button>
        </div>
    )
}