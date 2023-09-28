import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const canvasId = "cryptid-board-canvas"

export default function PlayingBoard() {

    const mapPeices = useSelector(s => s.board.mapChunks)
    let hexes = useSelector(s => s.board.hexes)
    const canvasRef = useRef(null)

    // drawBoard
    useEffect(function () {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            const H = parseFloat(canvasRef.current.getAttribute("height"))
            const W = parseFloat(canvasRef.current.getAttribute("width"))
                // STROKE_STYLE = "black",
                // FILL_STYLE = "black",
                // FONT = {
                //     size: 40,
                //     family: "courier",
                //     bold: true
                // }

            // ctx.strokeStyle = STROKE_STYLE
            // ctx.fillStyle = FILL_STYLE
            // ctx.font = `${FONT.bold ? 'bold ' : ''}${FONT.size}px ${FONT.family}`

            ctx.clearRect(0, 0, W, H)

            let examplePiece = {
                "id": 0,
                "placed": 0,
                "rotated": false,
                "image": "/static/media/0.138ff576c5fff6cb5eda.png"
            }

            // loop for each map chunk
            mapPeices.forEach((peice, i) => {
                let chunkImg = new Image()
                chunkImg.src = peice.image
                // get offset values
                let dx = (peice.placed % 2) * chunkImg.width - (peice.placed % 2) * 10
                let dy = Math.floor(peice.placed / 2) * chunkImg.height - (Math.floor(peice.placed / 2) * 20)

                // TODO: check if it's rotated
                // canvas.drawImage?
                ctx.drawImage(chunkImg, dx, dy)
            })

        }

    }, [hexes, mapPeices])

    return (
        <div className="PlayingBoard">
            <canvas ref={canvasRef} id={canvasId} height="600" width="800" >
                Oops. It seems that the canvas broke. :(
            </canvas>
        </div>
    )
}