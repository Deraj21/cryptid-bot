import React, { useEffect, useState, userRef } from "react";
import { useSelector } from "react-redux";
import CanvasBoardHelper from "../utils/CanvasBoardHelper";

const canvasId = "cryptid-board-canvas"

export default function PlayingBoard() {

    const mapPeices = useSelector(s => s.board.mapChunks)
    let hexes = useSelector(s => s.board.hexes)
    let peices = useSelector(s => s.board.mapChunks)
    let canvasHelper

    const h = 600
    const w = 600
    
    const canvasRef = useRef(null)

    useEffect(() => {
        let canvas = canvasRef.current
        // create board helper
        canvasHelper = new CanvasBoardHelper(canvas)

        // draw the board initially
        canvasHelper.draw([ ...peices ], [ ...hexes ])
    })

    // listen for when a user right-clicks
        // create menu (use material ui)
        // on click of menu item -> update board data & redraw board

    }, [hexes, mapPeices])

    return (
        <div className="PlayingBoard">
            <canvas ref={canvasRef} id={canvasId}  height={h} width={w} >
                Oops. It seems that the canvas broke.
            </canvas>
        </div>
    )
}