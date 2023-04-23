const points = {
    ship: [
        { x:  4, y:  0 },
        { x: -4, y:  3 },
        { x: -2, y:  0 },
        { x: -4, y: -3 }
    ],
    shipFlame: [
        { x: -2, y:   0 },
        { x: -5, y: 1.5 },
        { x: -4, y:  .5 },
        { x: -5, y:   0 },
        { x: -4, y: -.5 },
        { x: -5, y: -1.5 }
    ]
}
  
const Draw = {
    /**
     * @param {Object} pos - position
     * @param {number} pos.x - x position
     * @param {number} pos.y - y position
     * @param {number} rot - rotation in radians
     */
    transform: function(pos, rot = 0){
        let {x, y} = pos
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rot)
    },
    /**
     * @param {Object[]} points - points of polygon
     * @param {string} color - ctx.strokeStyle
     */
    drawPoly: function(points, color){
        ctx.beginPath()
        points.forEach((p, i) => {
        if (i === 0) {
            ctx.moveTo(p.x, p.y)
        } else {
            ctx.lineTo(p.x, p.y)
        }
        })
        ctx.closePath()
        if (color) {
            var temp = ctx.strokeStyle; ctx.strokeStyle = color;
        }
        ctx.stroke()
        ctx.strokeStyle = temp
    },
    /**
     * @param {Object} pos - position
     * @param {number} pos.x - x position
     * @param {number} pos.y - y position
     * @param {number} rot - rotation in radians
     * @param {number} scale - 'size' of ship
     * @param {string} color - ctx.strokeStyle compatible
     * @param {boolean} drawFlame - should the flame be drawn?
     * @param {string} flameColor
     * @param {number} radius - size of the hitbox (for debugging)
     */
    drawShip(pos, rot, scale, color, drawFlame = false, flameColor = "", radius = null){
        // transform
        Draw.transform(pos, rot)
        Draw.drawPoly(
        points.ship.map(p => { return { x: p.x * scale, y: p.y * scale} }),
        color
        )
        if (drawFlame){
        Draw.drawPoly(
            points.shipFlame.map(p => { return { x: p.x * scale, y: p.y * scale} }),
            flameColor
        )
        }
        ctx.restore()
    },
    drawShield: function(pos, rot = 0, scale, color = ""){
        Draw.transform(pos, rot)
        if (color) ctx.strokeStyle = color

        ctx.beginPath()
        ctx.arc(0, 0, scale * 6, 0, Math.PI * 2)
        ctx.stroke()
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(0, 0, scale * 7.2, 0, Math.PI * 2)
        ctx.stroke()

        ctx.restore()
    },
    /**
     * @param {Object} pos - position
     * @param {number} pos.x - x position
     * @param {number} pos.y - y position
     * @param {number} rot - rotation in radians
     * @param {number} scale - 'size' of ship
     * @param {string} color - ctx.strokeStyle compatible
     * @param {boolean} drawFlame - should the flame be drawn?
     * @param {string} flameColor
     * @param {number} radius - size of the hitbox (for debugging)
     */
    drawRock: function(pos, rot, scale, color, radius = null){
        
    },
    /**
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {string} fill
     * @param {string} stroke
     * @param {string} hAlign "left", "right", "center"
     * @param {string} vAlign "bottom", "top", "center"
     * @param {boolean} boxed puts box around letters
     */
    drawText: function(text, x, y, fill = "black", stroke = "", hAlign = "left", vAlign = "bottom", boxed = false){
        const h = FONT.size * .6
        const w = FONT.size * .6 * text.length

        // adjust for vertical alignment
        switch(hAlign){
        case 'center':
            x -= w / 2
            break;
        case 'right':
            x -= w
            break;
        case 'left':
        default:
            break;
        }
        
        // adjust for horizontal alignment
        switch(vAlign){
        case 'center':
            y += h / 2
            break;
        case 'top':
            y += h
            break;
        case 'bottom':
        default:
            break;
        }

        ctx.fillStyle = fill
        ctx.fillText(text, x, y)
        if (stroke) {
        ctx.strokeStyle = stroke
        ctx.strokeText(text, x, y)
        }

        // boxed
        if (boxed){
        ctx.strokeRect(x, y - FONT.size * .6, FONT.size * .6 * text.length, FONT.size * .6)
        }
    },
    /**
     * @param {number} lives - number of ships to draw on the screen
     * @param {number} scale - 'size' of the ships
     * @param {string} color - ctx.strokeStyle
     */
    drawLives: function(lives, scale, color){
        let xOffset = 20
        let yOffset = 20
        let spacing = 20

        for (let i = 0; i < lives; i++){
        Draw.drawShip(
            { x: i * spacing + xOffset, y: yOffset},
            Math.PI * 3/2, scale, color
        )
        }
    }
}
  
  

export default {
    
}

