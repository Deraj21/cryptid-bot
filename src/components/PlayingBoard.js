import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Menu, MenuItem } from '@mui/material';

import CanvasBoardHelper from "../utils/CanvasBoardHelper";

const canvasId = "cryptid-board-canvas"

export default function PlayingBoard() {

    let hexes = useSelector(s => s.board.hexes)
    let peices = useSelector(s => s.board.mapChunks)
    const [canvasHelper, setCanvasHelper] = useState(null)
    const [redrawTrigger, redraw] = useState(false)
    const [contextMenu, setContextMenu] = useState(null)

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

    const handleContextMenuClick = (e) => {
        console.log('open menu')

        e.preventDefault()
        setContextMenu(
            contextMenu === null
            ? {
                mouseX: e.clientX,
                mouseY: e.clientY,
            } :
            null
        )
    }

    const handleClose = (e) => {
        console.log('menu item')
        setContextMenu(null)
    }

    return (
        <div className="PlayingBoard">
            <canvas ref={canvasRef} id={canvasId} onContextMenu={handleContextMenuClick} height={h} width={w} >
                Oops. It seems that the canvas broke.
            </canvas>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
                }
            >
                <MenuItem onClick={handleClose} >Place Cube</MenuItem>
                <MenuItem onClick={handleClose} >Place Disk</MenuItem>
                <MenuItem onClick={handleClose} >Ask Bot</MenuItem>
            </Menu>
            <button
                onClick={() => redraw(true)}
            >Redraw</button>
        </div>
    )
}