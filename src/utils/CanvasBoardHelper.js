import media from '../utils/media.js'
import dataHelper from "../utils/data.js"

const { CHUNK_WIDTH, CHUNK_HEIGHT, MASK_WIDTH, MASK_HEIGHT, STRUCTURE_WIDTH, STRUCTURE_HEIGHT, CHUNK_FIT_X, CHUNK_FIT_Y, HEX_HEIGHT, HEX_WIDTH } = dataHelper

function makeImg(src) {
    let i = new Image()
    i.src = src
    return i
}

export default class CanvasBoardHelper {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
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

    drawPoint(x, y, color = "red"){
        let { ctx } = this

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
    }

    drawMask(x, y){
        let { ctx } = this
        let maskImage = makeImg(media.mask)
        ctx.drawImage(maskImage, x - maskImage.width / 2, y - maskImage.height / 2)
    }

    drawDisk(x, y, color) {
        console.log("draw disk", color);
        let { ctx } = this
        let radius = 5

        ctx.fillStyle = color.replaceAll(" ", "")
        ctx.strokeStyle = "white"
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
    }

    drawCube(x, y, color) {
        console.log("draw cube", color);
        let {ctx} = this
        let side = 10
        let half = side / 2

        ctx.fillStyle = color.replaceAll(" ", "")
        ctx.strokeStyle = "white"
        ctx.fillRect(x - half, y - half, side, side)
        ctx.strokeRect(x - half, y - half, side, side)
    }

    drawMarkers(x, y, yesMarkers, noMarker) {
        let markerCount = noMarker ? 1 : 0
        markerCount += yesMarkers.length
        let radius = HEX_WIDTH / 1.7
        let angle = Math.PI * 2 / markerCount

        if (markerCount)
            console.log(markerCount, yesMarkers, noMarker)
        
        for (let i = 0; i < markerCount; i++){
            let dx = radius * Math.cos(angle * i)
            let dy = radius * Math.sin(angle * i)

            let color = yesMarkers[i]
            console.log(color)
            if (!color){
                this.drawCube(x + dx, y + dy, noMarker)
            } else {
                this.drawDisk(x + dx, y + dy, color)
            }
        }
    }

    draw(pieces, hexes) {
        let { ctx } = this
        let { boardChunks, mask, structures } = media
        ctx.reset()
        
        // draw board peices
        pieces.sort((a, b) => a.placed - b.placed)
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
                let { structureColor, structureType, yesMarkers, noMarker, coords } = hex
                let { x, y } = dataHelper.getScreenPositionFromCoordinates(coords.row, coords.col)
                
                if (structureColor){
                    // console.log(structureColor, structureType, {x, y})
                    let imgObject = makeImg(media.structures[`${structureType}-${structureColor}`])
                    let halfWidth = imgObject.width / 2
                    let halfHeight = imgObject.height / 2

                    // this.setTransform(w + position.row, )
                    ctx.drawImage(imgObject, x - halfWidth, y - halfHeight)
                }

                this.drawMarkers(x, y, yesMarkers, noMarker)
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