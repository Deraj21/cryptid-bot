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
    let currentHex = useSelector(s => s.board.currentHex)

    const [menuAnchor, setMenuAnchor] = useState(null)
    
    const menuIsOpen = menuAnchor !== null

    let playerColors = []
    for (let key in players){
        playerColors.push({
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
        } else if (parentMenuId === "bot") {
            // console.log(botClues[color])
            let answer = BotLogic.askAboutHex(row, col, hexes, botClues[color])
            if (answer) {
                dispatch(placeYesMarker({row, col, color}))
            } else {
                dispatch(placeNoMarker({row, col, color}))
            }
        }

        handleClose()
    }

    const handleAskBotClick = () => {
        console.log("ask bot");
        // TODO: do stuff
        handleClose()
    }

    const getColorMenuItems = (parentMenuId) => {
        return playerColors
            .filter(playerColor => {
                if (parentMenuId === "bot") {
                    return playerColor.type === "bot"
                } else {
                    return playerColor.type === "player"
                }
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
                <NestedMenuItem label="Ask Bot"
                    parentMenuOpen={menuIsOpen}
                >
                    { getColorMenuItems("bot") }
                </NestedMenuItem>
            </Menu>
        </div>
    )
}
