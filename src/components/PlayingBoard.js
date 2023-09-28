import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CanvasBoardHelper from "../utils/CanvasBoardHelper";

export default function PlayingBoard() {

    let hexes = useSelector(s => s.board.hexes)
    let peices = useSelector(s => s.board.mapChunks)
    let canvasHelper

    const h = 600
    const w = 600

    useEffect(() => {
        let canvas = document.getElementById("play-board-canvas")
        // create board helper
        canvasHelper = new CanvasBoardHelper(canvas)

        // draw the board initially
        canvasHelper.draw([ ...peices ], [ ...hexes ])
    })

    // listen for when a user right-clicks
        // create menu (use material ui)
        // on click of menu item -> update board data & redraw board


    return (
        <div className="PlayingBoard">
            <canvas id="play-board-canvas" height={h} width={w}

            >
                Oops. It seems that the canvas broke.
            </canvas>
        </div>
    )
}