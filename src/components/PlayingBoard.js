import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setMenuAnchor } from "../config/boardSlice";

import Canvas from "./Canvas";
import ActionMenu from "./ActionMenu";
import BotToolbar from "./BotToolbar";

const canvasId = "cryptid-board-canvas"

export default function PlayingBoard() {
    const dispatch = useDispatch()

    let hexes = useSelector(s => s.board.hexes)
    let currentCoords = useSelector(s => s.board.currentHex)
    let menuAnchor = useSelector(s => s.board.menuAnchor)

    const menuIsOpen = menuAnchor !== null

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
        dispatch(setMenuAnchor(!menuIsOpen ? mousePosition : null))
    }

    return (
        <div className="PlayingBoard">
            <BotToolbar/>

            <Canvas id={canvasId}
                onContextMenu={handleContextMenuClick}
                height={h}
                width={w}
            />

            <ActionMenu/>
        </div>
    )
}
