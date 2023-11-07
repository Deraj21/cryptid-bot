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
    
    getStructureData: function() {
        const structureData = []
        return structureData
    },
    getCoordinatesFromScreenPosition: function(x, y) {
        let row, col

        
        
        return { row, col }
    },
    getScreenPositionFromCoordinates: function(row, col) {
        let doubleIfOdd = col % 2 !== 0 ? 2 : 1

        let x = col * 1.5 * HEX_WIDTH + HEX_WIDTH
        let y = row * 2 * HEX_HEIGHT + (doubleIfOdd * HEX_HEIGHT)

        return { x, y }
    },
    convertSetupToPlay: function(mapChunks, structures) {
        // sort structures by chunkId
        let structs = [ ...structures ]
        // structs.sort((a, b) => a.chunkId - b.chunkId)
        
        // sort map chunks by placement
        let chunks = [ ...mapChunks ]
        chunks.sort((a, b) => a.placed - b.placed)

        let hexes = [
            [{},{},{},{},{},{}, {},{},{},{},{},{},],
            [{},{},{},{},{},{}, {},{},{},{},{},{},],
            [{},{},{},{},{},{}, {},{},{},{},{},{},],

            [{},{},{},{},{},{}, {},{},{},{},{},{},],
            [{},{},{},{},{},{}, {},{},{},{},{},{},],
            [{},{},{},{},{},{}, {},{},{},{},{},{},],

            [{},{},{},{},{},{}, {},{},{},{},{},{},],
            [{},{},{},{},{},{}, {},{},{},{},{},{},],
            [{},{},{},{},{},{}, {},{},{},{},{},{},],
        ]

        let numCols = 6
        let numRows = 3
        
        // loop through each map chunk
        chunks.forEach(chunk => {
            let { rotated, id, placed } = chunk
            let chunkCol = placed%2
            let chunkRow = Math.floor(placed/2)
            let dc = chunkCol * numCols
            let dr = chunkRow * numRows

            const setHexData = function(row, col) {
                // coords (row, col), from the loop index
                let coords = {
                    row: rotated ? numRows - 1 - row : row,
                    col: rotated ? numCols - 1 - col : col
                }
                let hex = hexes[dr + row][dc + col]
                hex.coords = {row: dr + row, col: dc + col}
                
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
            for (let row = 0; row < numRows; row++){
                for (let col = 0; col < numCols; col++){
                    setHexData(row, col)
                }
            }

            
        })

        return hexes
    }
}
