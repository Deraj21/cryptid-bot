import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem } from '@mui/material';
import { NestedMenuItem } from 'mui-nested-menu';
import { placeNoMarker, placeYesMarker, setHexData, setMapChunks } from "../config/boardSlice";
import { dummyHexes, dummyMapPeices } from "../data/dummyData"

import CanvasBoardHelper from "../utils/CanvasBoardHelper";
import dataHelper from "../utils/data"
import Canvas from "./Canvas";

const canvasId = "cryptid-board-canvas"

export default function PlayingBoard() {
    "use strict";

    const dispatch = useDispatch()

    let hexes = useSelector(s => s.board.hexes)
    let peices = useSelector(s => s.board.mapChunks)
    let players = useSelector(s => s.board.players)
    let currentHex = useSelector(s => s.board.currentHex)

    // const [canvasHelper, setCanvasHelper] = useState(null)
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

    const handleColorClick = (e, color, parentMenuId) => {
        let {row, col} = currentHex

        // TODO: do stuff
        if (parentMenuId === "disk") {
            dispatch(placeYesMarker({row, col, color}))
        } else if (parentMenuId === "cube" && !hexes[row][col].noMarker) {
            dispatch(placeNoMarker({row, col, color}))
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
            <Canvas id={canvasId}
                onContextMenu={handleContextMenuClick}
                height={h}
                width={w}
            />

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
