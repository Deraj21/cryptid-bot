import media from '../utils/media.js'

function makeImg(src) {
    let i = new Image()
    i.src = src
    return i
}

export default class CanvasBoardHelper {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.H = canvas.getAttribute("height")
        this.W = canvas.getAttribute("width")
        this.chunkH = this.H / 3
        this.chunkW = this.W / 2
        this.h = this.H / 9
        this.w = this.W / 12
    }

    draw(peices, hexes) {
        let { canvas, ctx } = this
        let { boardChunks, mask, structures } = media
        ctx.reset()
        
        // draw board peices
        peices.sort((a, b) => a.placed - b.placed)
            .forEach((peice, i) => {
                let dx = (i % 2) * 236
                let dy = Math.floor(i / 2) * 138
                ctx.drawImage(makeImg(peice.image), dx, dy)
            })
        
        let done = false
        hexes.forEach(row => {
            row.forEach(hex => {
                let { structureColor, yesMarkers, noMarker, position } = hex
                // TODO: display structure
                // let dx = position.row * 
                // let dy 

                if (structureColor){
                }

                if (yesMarkers.length){

                }

                if (noMarker){

                }
            })
        })

        let hex = {
            "position": {
                "row": 0,
                "col": 0
            },
            "terrainType": "desert",
            "animalTerritory": "bear",
            "noMarker": "",
            "yesMarkers": [],
            "structureColor": "",
            "stuctureType": ""
        }

        let peice = {
            "id": 1,
            "placed": 5,
            "rotated": false,
            "image": "/static/media/1.ea9d3e8c8d14a0bcdb6c.png"
        }
        
        
        // draw structures
        // draw yes's and no's


    }

    printBoard(hexes) {
        if (hexes && hexes.length){
            let text = hexes.map(row => {
                return row.map(hex => {
                    return hex.terrainType[0]
                }).join(' ')
            }).join('\n')
    
            console.log(text)
        }
    }
}