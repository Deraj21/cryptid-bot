import data from "./data"
const { NUM_COLS, NUM_ROWS } = data

const askAboutHex = (row, col, hexes, clueInfo) => {
    let coordsToSearch = findHexesWithinDistance(row, col, clueInfo.spacesAway)

    // loop through each hex
    // if any one hex fulfills the condition, return result
    for (let i = 0; i < coordsToSearch.length; i++) {
        let coords = coordsToSearch[i]
        let hexData = hexes[coords.row][coords.col]

        // check if hex property found in value array
        let value = hexData[clueInfo.property]
        if (clueInfo.values.includes(value)) {
            // if clue starts with 'not' we need to reverse the result
            return clueInfo.isNegative ? false : true
        }
    }

    return clueInfo.isNegative ? true : false
}

const findHexesWithinDistance = (row, col, distance) => {
    distance = distance > 3 ? 3 : distance
    distance = distance < 0 ? 0 : distance

    let hexesInRange = []
    let y = row
    let x = col

    const addHex = () => {
        if (x < 0 || x > NUM_COLS - 1)
            return
        if (y < 0 || y > NUM_ROWS - 1)
            return

        hexesInRange.push({ row: y, col: x })
    }
    const isEven = (n) => n % 2 === 0
    const loop = (count, cb) => {
        for (let i = 0; i < count; i++) {
            cb()
        }
    }

    addHex()

    for (let i = distance; i > 0; i--) {
        x = col
        y = row
        // move up
        y -= i

        // down left
        loop(i, () => {
            y = isEven(x) ? y : y + 1
            x -= 1
            addHex()
        })

        // down
        loop(i, () => {
            y += 1
            addHex()
        })

        // down right
        loop(i, () => {
            y = isEven(x) ? y : y + 1
            x += 1
            addHex()
        })

        // up right
        loop(i, () => {
            y = isEven(x) ? y - 1 : y
            x += 1
            addHex()
        })

        // up
        loop(i, () => {
            y -= 1
            addHex()
        })

        // up left
        loop(i, () => {
            y = isEven(x) ? y - 1 : y
            x -= 1
            addHex()
        })

    }


    return hexesInRange
}

const example = { // "not within one space of either animal territory"
    isNegative: true,
    spacesAway: 1,
    property: "territory",
    values: ["bear", "cougar"]
}

export default { askAboutHex, findHexesWithinDistance }