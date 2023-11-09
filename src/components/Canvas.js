import React, { useEffect, useRef, useState } from "react";
import CanvasBoardHelper from "../utils/CanvasBoardHelper";
import { useDispatch, useSelector } from "react-redux";
import dataHelper from "../utils/data";
import { setCurrentHex } from "../config/boardSlice";

export default function Canvas(props) {
    "use strict";

    const dispatch = useDispatch()

    let hexes = useSelector(s => s.board.hexes)
    let mapChunks = useSelector(s => s.board.mapChunks)

    let [maskPosition, setMaskPosition] = useState({x: 0, y: 0})

    const canvasRef = useRef(null)

    useEffect(() => {
        if (canvasRef.current){
            let canvasHelper = new CanvasBoardHelper(canvasRef.current)
            canvasHelper.draw([...mapChunks], [...hexes])
            // console.log(hexes)
            canvasHelper.drawMask(maskPosition.x, maskPosition.y)
        }
    }, [hexes, maskPosition])

    const handleMouseMove = (e) => {
        var rect = canvasRef.current.getBoundingClientRect()
        
        let {row, col} = dataHelper.getCoordinatesFromScreenPosition(e.clientX - rect.left, e.clientY - rect.top)
        let point = dataHelper.getScreenPositionFromCoordinates(row, col)
        setMaskPosition(point)
        dispatch(setCurrentHex({row, col}))
    }
    
    const handleCanvasClick = e => {
        var rect = canvasRef.current.getBoundingClientRect()
        let x = e.clientX - rect.left
        let y =  e.clientY - rect.top
        let hexCenterPoint = dataHelper.getClosestCenterpoint(x, y)

        let canvasHelper = new CanvasBoardHelper(canvasRef.current)
        canvasHelper.drawPoint(x, y, "yellow")
        canvasHelper.drawPoint(hexCenterPoint.x, hexCenterPoint.y)
    }

    return <canvas ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleCanvasClick}
        {...props}
    >
        Oops. It seems that the canvas broke.
    </canvas>
}