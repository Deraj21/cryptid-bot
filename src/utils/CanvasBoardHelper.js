import media from '../utils/media.js'
import dataHelper from "../utils/data.js"

const { CHUNK_WIDTH, CHUNK_HEIGHT, MASK_WIDTH, MASK_HEIGHT, STRUCTURE_WIDTH, STRUCTURE_HEIGHT, CHUNK_FIT_X, CHUNK_FIT_Y, } = dataHelper

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

    /**
     * 
     * @param {Number} x
     * @param {Number} y 
     * @param {Number} rotation 
     */
    setTransform(x, y, rotation) {
        let { ctx } = this

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)
    }

    draw(peices, hexes) {
        let { canvas, ctx } = this
        let { boardChunks, mask, structures } = media
        ctx.reset()
        
        // draw board peices
        peices.sort((a, b) => a.placed - b.placed)
            .forEach((peice, i) => {

                let dx = (i % 2) * (CHUNK_WIDTH + CHUNK_FIT_X)
                let dy = Math.floor(i / 2) * (CHUNK_HEIGHT + CHUNK_FIT_Y)
                let imgObject = makeImg(peice.image)
                let w = imgObject.width / 2
                let h = imgObject.height / 2

                this.setTransform(w + dx, h + dy, peice.rotated ? Math.PI : 0)
                ctx.drawImage(imgObject, -w, -h)
                ctx.restore()
            })
        
        let done = false
        hexes.forEach((row, ri) => {
            row.forEach((hex, i) => {
                let { structureColor, structureType, yesMarkers, noMarker, position, chunkCoords } = hex
                
                // let dx = position.row * 
                // let dy 
                
                // TODO: display structures
                if (structureColor){
                    
                    let imgObject = makeImg(media.structures[`${structureType}-${structureColor}`])
                    let w = imgObject.width / 2
                    let h = imgObject.height / 2
                    let dx = chunkCoords.col * (CHUNK_WIDTH + CHUNK_FIT_X)
                    let dy = chunkCoords.row * (CHUNK_HEIGHT + CHUNK_FIT_Y)

                    // this.setTransform(w + position.row, )
                    ctx.drawImage(imgObject, dx + position.x - w, dy + position.y - h)
                }
                
                if (yesMarkers.length){

                }

                if (noMarker){

                }
            })
        })

        const exampleHex = {
            "coords": {
                "row": 0,
                "col": 1
            },
            "terrainType": "water",
            "animalTerritory": "none",
            "noMarker": "",
            "yesMarkers": [],
            "structureColor": "white",
            "structureType": "as",
            "position": {
                "x": 65.78,
                "y": 45.71
            }
        }

        const examplePeice = {
            "id": 1,
            "placed": 5,
            "rotated": false,
            "image": "/static/media/1.ea9d3e8c8d14a0bcdb6c.png"
        }


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