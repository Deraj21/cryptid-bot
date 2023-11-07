import React, { useEffect, useRef, useState } from "react";
import CanvasBoardHelper from "../utils/CanvasBoardHelper";
import { useSelector } from "react-redux";

export default function Canvas(props) {
    "use strict";

    let hexes = useSelector(s => s.board.hexes)
    let mapChunks = useSelector(s => s.board.mapChunks)

    const canvasRef = useRef(null)

    useEffect(() => {
        if (canvasRef.current){
            let canvasHelper = new CanvasBoardHelper(canvasRef.current)
            canvasHelper.draw([...mapChunks], [...hexes])
        }
    }, [hexes])

    return <canvas ref={canvasRef} {...props} >
        Oops. It seems that the canvas broke.
    </canvas>
}