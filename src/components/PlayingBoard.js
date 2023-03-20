import React from "react";
import { useSelector } from "react-redux";

export default function PlayingBoard() {

    let hexes = useSelector(s => s.board.hexes)

    if (hexes && hexes.length){
        
        let text = hexes.map(row => {
            return row.map(hex => {
                return hex.terrainType[0]
            }).join(' ')
        }).join('\n')

        console.log(text)
    }


    return (
        <div className="PlayingBoard">
            <canvas height="900" width="1200" >
                Oops. It seems that the canvas broke. :(
            </canvas>
        </div>
    )
}