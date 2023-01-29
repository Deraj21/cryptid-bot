import './Ruler.css'

export default function Ruler(props){
    const h = 60
    const w = 1
    let { numTicks, spaceBetween, unit, hasTallTicks, tallTickSpacing, marginLeft } = props
    let ticks = []

    for (let i = 0; i < numTicks; i++) {
        let isTall = (hasTallTicks && i % tallTickSpacing == 0)
        let isInMiddle = (i !== 0 && i+1 !== numTicks)
        let height = isTall ? h / 1.5 : h / 2
        ticks.push(
            <div key={i} className={`tick`}
                style={{
                    backgroundColor: "black",
                    height: `${height}px`,
                    width: `${w}px`,
                }}
            >
                {
                    isTall ?
                    <p
                        style={{
                            marginLeft: `${-spaceBetween/4}px`,
                            // marginTop: `${-10}px`
                        }}
                    >{isInMiddle ? i*spaceBetween : ''}</p> :
                    ''
                }
            </div>
        )
    }

    return (
        <div className="Ruler"
            style={{
                width: `${spaceBetween*numTicks}${unit}`,
                height: `${h}px`,
                marginLeft: marginLeft ? marginLeft : '0px'
            }}
        >
            <p className="ruler-description">{`unit: ${spaceBetween} ${unit}`}</p>
            <div className='tick-box'>
                { ticks }
            </div>
        </div>
    )
}