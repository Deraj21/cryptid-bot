import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem } from '@mui/material';
import { NestedMenuItem } from 'mui-nested-menu';

import { placeNoMarker, placeYesMarker } from "../config/boardSlice";
import BotLogic from "../utils/BotLogic";
import Canvas from "./Canvas";

const canvasId = "cryptid-board-canvas"

export default function PlayingBoard() {

    const dispatch = useDispatch()

    let hexes = useSelector(s => s.board.hexes)
    let players = useSelector(s => s.player.players)
    let botClues = useSelector(s => s.player.botClues)
    let currentCoords = useSelector(s => s.board.currentHex)

    const [menuAnchor, setMenuAnchor] = useState(null)

    const menuIsOpen = menuAnchor !== null

    let playerColors = []
    for (let key in players) {
        playerColors.push({
            id: key,
            ...players[key]
        })
    }

    let currentHex = {}
    if (hexes.length && currentCoords.row) {
        currentHex = hexes[currentCoords.row][currentCoords.col]
    }

    const h = 600
    const w = 600

    const handleContextMenuClick = (e) => {
        e.preventDefault()
        let mousePosition = {
            mouseX: e.clientX,
            mouseY: e.clientY
        }

        if (currentHex.noMarker) {
            return
        }

        setMenuAnchor(!menuIsOpen ? mousePosition : null)
    }

    const handleClose = (e) => {
        setMenuAnchor(null)
    }

    const handleColorClick = (e, color, parentMenuId) => {
        let { row, col } = currentCoords

        if (parentMenuId === "disk") {
            dispatch(placeYesMarker({ row, col, color }))
        } else if (parentMenuId === "cube" && !currentHex.noMarker) {
            dispatch(placeNoMarker({ row, col, color }))
        } else if (parentMenuId === "bot" && !currentHex.noMarker) {
            let answer = BotLogic.askAboutHex(row, col, hexes, botClues[color])
            if (answer) {
                dispatch(placeYesMarker({ row, col, color }))
            } else {
                dispatch(placeNoMarker({ row, col, color }))
            }
        }

        handleClose()
    }

    const getColorMenuItems = (parentMenuId) => {
        return playerColors
            .filter(playerColor => {
                if (!currentCoords.row) {
                    return true
                }

                if (currentHex.yesMarkers.includes(playerColor.id)) {
                    return false
                }

                if (parentMenuId === "bot") {
                    return playerColor.type === "bot"
                }

                return playerColor.type === "player"
            })
            .map(player => {
                return (
                    <MenuItem key={player.name}
                        onClick={(e) => handleColorClick(e, player.id, parentMenuId)}
                    >
                        {player.name}
                    </MenuItem>
                )
            })
    }

    let cubeMenuItems = getColorMenuItems("cube")
    let diskMenuItems = getColorMenuItems("disk")
    let botMenuItems = getColorMenuItems("bot")

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
                {
                    cubeMenuItems.length
                    ?
                    <NestedMenuItem label="Place Cube"
                        parentMenuOpen={menuIsOpen}
                    >
                        {cubeMenuItems}
                    </NestedMenuItem>
                    :
                    ''
                }
                {
                    diskMenuItems.length
                    ?
                    <NestedMenuItem label="Place Disk"
                        parentMenuOpen={menuIsOpen}
                    >
                        {diskMenuItems}
                    </NestedMenuItem>
                    :
                    ''
                }
                {
                    botMenuItems.length
                    ?
                    <NestedMenuItem label="Ask Bot"
                        parentMenuOpen={menuIsOpen}
                    >
                        {botMenuItems}
                    </NestedMenuItem>
                    :
                    ''
                }

            </Menu>
        </div>
    )
}
