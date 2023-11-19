import data from "./data"
const { NUM_COLS, NUM_ROWS } = data


const BotLogic = {
    askAboutHex: (row, col, hexes, clueInfo) => {
        console.log({
            row, col, clueInfo
        })
    },
    findHexesWithinDistance: (row, col, distance) => {
        distance = distance > 3 ? 3 : distance
        distance = distance < 0 ? 0 : distance

        let hexesInRange = []
        let y = row
        let x = col

        const addHex = () => {
            if (x < 0 || x > NUM_COLS-1)
                return
            if (y < 0 || y > NUM_ROWS-1)
                return
            
            hexesInRange.push({row: y, col: x})
        }
        const isEven = (n) => n % 2 === 0
        
        addHex()

        // move up
        y -= distance

        // down left
        y = isEven(x) ? y : y + 1
        x -= 1
        addHex()

        // down
        y += 1
        addHex()

        // down right
        y = isEven(x) ? y : y + 1
        x += 1
        addHex()

        // up right
        y = isEven(x) ? y - 1 : y
        x += 1
        addHex()

        // up
        y -= 1
        addHex()

        // up left
        y = isEven(x) ? y - 1 : y
        x -= 1
        addHex()

        return hexesInRange
    }
}

export default BotLogic