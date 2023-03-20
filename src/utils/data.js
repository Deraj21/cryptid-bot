import cryptidMapData from "../data/cryptid-map-data"

export default {
    getStructureData: function() {
        const structureData = []
        return structureData
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
        
        // // loop through each map chunk
        chunks.forEach(chunk => {
            let { rotated, id, placed } = chunk
            let dc = placed%2 * numCols
            let dr = Math.floor(placed/2) * numRows

            const setHexData = function(row, col) {
                // position (row, col), from the loop index
                let coords = {
                    row: rotated ? numRows - 1 - row : row,
                    col: rotated ? numCols - 1 - col : col
                }
                let hex = hexes[dr + row][dc + col]
                hex.position = {row: dr + row, col: dc + col}
                
                // use position to get the terrain type and animal territory
                let data = cryptidMapData.find(d => {
                    return id === d.chunkId && coords.row === d.row && coords.col === d.col
                })
                hex.terrainType = data.terrain
                hex.animalTerritory = data.territory

                hex.noMarker = ""
                hex.yesMarkers = []
                hex.structureColor = ""
                hex.stuctureType = ""
                
                // find if there's a structure there (stop looking once passed current chunk or position)
                structs.forEach(struct => {
                    if (id === struct.chunkId && row === struct.coords.row && col === struct.coords.col) {
                        // set structure for hex
                        hex.stuctureType = struct.id.split("-")[0]
                        hex.structureColor = struct.id.split("-")[1]
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

/*

    structures {
        id: "as-white",
        name: "Abandoned Shack, White",
        image: p1,
        chunkId: null,
        coords: null,
        position: null
    }

    mapChunks {
        id: 2,
        placed: null,
        rotated: false,
        image: chunkImages[2]
    }

    hex {
        position: { row: 2, col: 0 },
        terrainType: "water",
        animalTerritory: "bear",
        noMarker: "orange",
        yesMarkers: [ "lightblue", "red" ]
        structure: { color: "white", type: "as" },
    }

    mapData {
        id: 0,
        chunkId: 0,
        row: 0,
        col: 0,
        terrain: "water",
        territory: "none",
        structureColor: "",
        structureType: "",
    },

*/