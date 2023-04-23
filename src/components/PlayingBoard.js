import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const canvasId = "cryptid-board-canvas"

export default function PlayingBoard() {

    const mapPeices = useSelector(s => s.board.mapChunks)
    let hexes = useSelector(s => s.board.hexes)

    // drawBoard
    useEffect(function() {
        const canvas = document.getElementById(`#${canvasId}`)
        if (canvas){
            const ctx = canvas.getContext('2d'),
                H = parseFloat(canvas.getAttribute("height")),
                W = parseFloat(canvas.getAttribute("width")),   
                STROKE_STYLE = "black",
                FILL_STYLE = "black",
                FONT = {
                    size: 40,
                    family: "courier",
                    bold: true
                }
    
            ctx.strokeStyle = STROKE_STYLE
            ctx.fillStyle = FILL_STYLE
            ctx.font = `${FONT.bold ? 'bold ' : ''}${FONT.size}px ${FONT.family}`



            // LEFT OFF: loop through each map peice and...
                // use the canvas function for drawing images to draw each one
        }

    }, [hexes])

    return (
        <div className="PlayingBoard">
            <canvas id={canvasId} height="600" width="800" >
                Oops. It seems that the canvas broke. :(
            </canvas>
        </div>
    )
}