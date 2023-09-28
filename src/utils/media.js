import asWhite from '../media/structures/p1.png'
import asGreen from '../media/structures/p2.png'
import asBlue from '../media/structures/p3.png'
import asBlack from '../media/structures/p4.png'
import ssWhite from '../media/structures/s1.png'
import ssGreen from '../media/structures/s2.png'
import ssBlue from '../media/structures/s3.png'
import ssBlack from '../media/structures/s4.png'

import c0 from '../media/board-chunks/0.png'
import c1 from '../media/board-chunks/1.png'
import c2 from '../media/board-chunks/2.png'
import c3 from '../media/board-chunks/3.png'
import c4 from '../media/board-chunks/4.png'
import c5 from '../media/board-chunks/5.png'

import mask from '../media/mask.png'

const i = (src) => {
    let newImage = new Image()
    newImage.src = src
    return newImage
}

export default {
    boardChunks: [ c0, c1, c2, c3, c4, c5 ],
    mask,
    structures: {
        "as-white": asWhite,
        "as-green": asGreen,
        "as-blue": asBlue,
        "as-black": asBlack,
        "ss-white": ssWhite,
        "ss-green": ssGreen,
        "ss-blue": ssBlue,
        "ss-black": ssBlack,
    }
}
