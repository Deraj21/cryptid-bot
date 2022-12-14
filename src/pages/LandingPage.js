import foliage from '../media/Cryptid_foliage.png'
import house from '../media/Cryptid_house.png'
import title from '../media/Cryptid_Title.png'

import { Link } from 'react-router-dom'


export default function LandingPage() {

    return (
        <div className="LandingPage" >
            <div className="background" style={{ backgroundImage: `url(${house})`}}>
                <img src={title} alt="cryptid-title" />
                
                <Link to="/setup">
                    <button className="btn">Start Game</button>
                </Link>
            </div>


        </div>
    )
}