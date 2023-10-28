import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Menu, MenuItem } from '@mui/material';
import { NestedMenuItem } from 'mui-nested-menu';

import CanvasBoardHelper from "../utils/CanvasBoardHelper";

const canvasId = "cryptid-board-canvas"

export default function PlayingBoard() {
    "use strict";

    let hexes = useSelector(s => s.board.hexes)
    let peices = useSelector(s => s.board.mapChunks)
    let players = useSelector(s => s.board.players)
    const [canvasHelper, setCanvasHelper] = useState(null)
    const [redrawTrigger, redraw] = useState(false)
    const [contextMenu, setContextMenu] = useState(null)

    let activePlayers = []
    for (let key in players){
        activePlayers.push({
            id: key,
            ...players[key]
        })
    }
    console.log(activePlayers)
    

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

    const handleContextMenuClick = (e) => {
        e.preventDefault()
        let mousePosition = {
            mouseX: e.clientX,
            mouseY: e.clientY
        }

        setContextMenu( contextMenu === null ? mousePosition : null )
    }

    const handleClose = (e) => {
        setContextMenu(null)
    }

    const handleColorClick = (playerColor) => {
        console.log(playerColor)
    }

    const colorMenuItems = activePlayers.map(player => {
        return (
            <MenuItem onClick={(e) => handleColorClick(player.name)}>{player.name}</MenuItem>
        )
    })

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
                <NestedMenuItem label="Place Cube"
                    onClick={handleClose}
                >
                    { colorMenuItems }
                </NestedMenuItem>
                <NestedMenuItem onClick={handleClose} >Place Disk</NestedMenuItem>
                <MenuItem onClick={handleClose} >Ask Bot</MenuItem>
            </Menu>
            <button
                onClick={() => redraw(true)}
            >Redraw</button>
        </div>
    )
}