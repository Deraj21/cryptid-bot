import cryptidMapData from "../data/cryptid-map-data"

const CHUNK_WIDTH = 250,
    CHUNK_HEIGHT = 160,
    HEX_WIDTH = CHUNK_WIDTH / 9.5,
    HEX_HEIGHT = CHUNK_HEIGHT / 7,
    MASK_WIDTH = 54,
    MASK_HEIGHT = 48,
    STRUCTURE_WIDTH = 24,
    STRUCTURE_HEIGHT = 24,
    CHUNK_FIT_X = -14,
    CHUNK_FIT_Y = -22


const isEven = n => n % 2 === 0

const distanceBetweenPoints = (x1, y1, x2, y2) => {
    let dx = Math.abs(x1 - x2)
    let dy = Math.abs(y1 - y2)

    return Math.sqrt(dx * dx + dy * dy)
}

export default {
    CHUNK_WIDTH,
    CHUNK_HEIGHT,
    HEX_HEIGHT,
    HEX_WIDTH,
    MASK_WIDTH,
    MASK_HEIGHT,
    STRUCTURE_WIDTH,
    STRUCTURE_HEIGHT,
    CHUNK_FIT_X,
    CHUNK_FIT_Y,

    getStructureData: function () {
        const structureData = []
        return structureData
    },
    getClosestCenterpoint: function (x, y) {
        let { row, col } = this.getCoordinatesFromScreenPosition(x, y)
        return this.getScreenPositionFromCoordinates(row, col)
    },
    getCoordinatesFromScreenPosition: function (x, y) {
        let hexCenterX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(col => {
            return HEX_WIDTH + (col * HEX_WIDTH * 1.5)
        })

        let hexCenterY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(row => {
            return (row + 1) * HEX_HEIGHT
        })

        hexCenterX.push(x)
        hexCenterY.push(y)
        hexCenterX.sort((a, b) => a - b)
        hexCenterY.sort((a, b) => a - b)
        let xIndex = hexCenterX.findIndex(xValue => xValue === x)
        let yIndex = hexCenterY.findIndex(yValue => yValue === y)

        let up
        if (isEven(xIndex) && isEven(yIndex) || !isEven(xIndex) && !isEven(yIndex)) {
            up = false
        } else {
            up = true
        }

        let point1 = {
            x: hexCenterX[xIndex - 1],
            y: up ? hexCenterY[yIndex + 1] : hexCenterY[yIndex - 1]
        }

        let point2 = {
            x: hexCenterX[xIndex + 1],
            y: up ? hexCenterY[yIndex - 1] : hexCenterY[yIndex + 1]
        }

        let distance1 = distanceBetweenPoints(x, y, point1.x, point1.y)
        let distance2 = distanceBetweenPoints(x, y, point2.x, point2.y)

        let coords = {}
        if (distance1 < distance2) {
            // point1
            coords.col = xIndex - 1
            coords.row = Math.floor((up ? yIndex : yIndex - 1) / 2)
        } else {
            // point2
            coords.col = xIndex
            coords.row = Math.floor((up ? yIndex - 1 : yIndex) / 2)
        }

        return coords
    },
    getScreenPositionFromCoordinates: function (row, col) {
        let doubleIfOdd = col % 2 !== 0 ? 2 : 1

        let x = col * 1.5 * HEX_WIDTH + HEX_WIDTH
        let y = row * 2 * HEX_HEIGHT + (doubleIfOdd * HEX_HEIGHT)

        return { x, y }
    },
    convertSetupToPlay: function (mapChunks, structures) {
        // sort structures by chunkId
        let structs = [...structures]
        // structs.sort((a, b) => a.chunkId - b.chunkId)

        // sort map chunks by placement
        let chunks = [...mapChunks]
        chunks.sort((a, b) => a.placed - b.placed)

        let hexes = [
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],

            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],

            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
            [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
        ]

        let numCols = 6
        let numRows = 3

        // loop through each map chunk
        chunks.forEach(chunk => {
            let { rotated, id, placed } = chunk
            let chunkCol = placed % 2
            let chunkRow = Math.floor(placed / 2)
            let dc = chunkCol * numCols
            let dr = chunkRow * numRows

            const setHexData = function (row, col) {
                // coords (row, col), from the loop index
                let coords = {
                    row: rotated ? numRows - 1 - row : row,
                    col: rotated ? numCols - 1 - col : col
                }
                let hex = hexes[dr + row][dc + col]
                hex.coords = { row: dr + row, col: dc + col }

                // use coords to get the terrain type and animal territory
                let data = cryptidMapData.find(d => {
                    return id === d.chunkId && coords.row === d.row && coords.col === d.col
                })
                hex.terrainType = data.terrain
                hex.animalTerritory = data.territory

                hex.noMarker = ""
                hex.yesMarkers = []
                hex.structureColor = ""
                hex.structureType = ""

                // find if there's a structure there (stop looking once passed current chunk or position)
                structs.filter(s => !!s.chunkId).forEach(struct => {
                    let structRow = rotated ? numRows - 1 - struct.coords.row : struct.coords.row
                    let structCol = rotated ? numCols - 1 - struct.coords.col : struct.coords.col
                    if (id === struct.chunkId && row === structRow && col === structCol) {
                        // set structure for hex
                        // console.log();
                        hex.structureType = struct.id.split("-")[0]
                        hex.structureColor = struct.id.split("-")[1]
                        hex.position = {
                            x: rotated ? CHUNK_WIDTH - struct.position.x : struct.position.x,
                            y: rotated ? CHUNK_HEIGHT - struct.position.y : struct.position.y
                        }
                        hex.chunkCoords = {
                            col: chunkCol,
                            row: chunkRow
                        }
                    }
                })
            }

            // (loop) for each hex in the chunk
            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numCols; col++) {
                    setHexData(row, col)
                }
            }


        })

        return hexes
    }
}
