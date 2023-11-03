import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Menu, MenuItem } from '@mui/material';
import { NestedMenuItem } from 'mui-nested-menu';
import { placeNoMarker, placeYesMarker, setHexData, setMapChunks } from "../config/boardSlice";
import { dummyHexes, dummyMapPeices } from "../data/dummyData"

import CanvasBoardHelper from "../utils/CanvasBoardHelper";

const canvasId = "cryptid-board-canvas"

export default function PlayingBoard() {
    "use strict";

    let hexes = useSelector(s => s.board.hexes)
    let peices = useSelector(s => s.board.mapChunks)
    let players = useSelector(s => s.board.players)

    const [canvasHelper, setCanvasHelper] = useState(null)
    const [redrawTrigger, redraw] = useState(false)
    const [menuAnchor, setMenuAnchor] = useState(null)

    const menuIsOpen = menuAnchor !== null

    let activePlayers = []
    for (let key in players){
        activePlayers.push({
            id: key,
            ...players[key]
        })
    }

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
    }, [canvasHelper, hexes, peices, redrawTrigger])

    const handleContextMenuClick = (e) => {
        e.preventDefault()
        let mousePosition = {
            mouseX: e.clientX,
            mouseY: e.clientY
        }

        setMenuAnchor( !menuIsOpen ? mousePosition : null )
    }

    const handleClose = (e) => {
        setMenuAnchor(null)
    }

    const handleColorClick = (e, playerColor, parentMenuId) => {
        console.log(playerColor, parentMenuId)

        // TODO: do stuff
        if (parentMenuId === "disk") {
            // let coords = CanvasBoardHelper.getCoordinatesFromScreenPosition(anchorPosition.x, anchorPosition.y)
            console.log({
                menuAnchor
            })
        } else if (parentMenuId === "cube") {

        }

        handleClose()
    }

    const handleAskBotClick = () => {
        console.log("ask bot");
        // TODO: do stuff
        handleClose()
    }

    const getColorMenuItems = (parentMenuId) => {
        return activePlayers.map(player => {
            return (
                <MenuItem key={player.name}
                    onClick={(e) => handleColorClick(e, player.name, parentMenuId)}
                >
                    {player.name}
                </MenuItem>
            )
        })
    }
    

    return (
        <div className="PlayingBoard">
            <canvas ref={canvasRef} id={canvasId} onContextMenu={handleContextMenuClick} height={h} width={w} >
                Oops. It seems that the canvas broke.
            </canvas>

            <Menu
                open={menuIsOpen}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    menuIsOpen
                    ? { top: menuAnchor.mouseY, left: menuAnchor.mouseX }
                    : undefined
                }
            >
                <NestedMenuItem label="Place Cube"
                    parentMenuOpen={menuIsOpen}
                >
                    { getColorMenuItems("cube") }
                </NestedMenuItem>
                <NestedMenuItem label="Place Disk"
                    parentMenuOpen={menuIsOpen}
                >
                    { getColorMenuItems("disk") }
                </NestedMenuItem>
                <MenuItem onClick={handleAskBotClick} >Ask Bot</MenuItem>
            </Menu>
        </div>
    )
}
