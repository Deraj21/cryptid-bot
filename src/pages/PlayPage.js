import { useSelector } from "react-redux";
import PlayingBoard from "../components/PlayingBoard";
import { Link } from "react-router-dom";
import { setHexData, setMapChunks } from "../config/boardSlice";
import { dummyHexes, dummyMapPeices } from "../data/dummyData";

export default function PlayPage() {

    let hexes = useSelector(s => s.board.hexes)
    let peices = useSelector(s => s.board.mapChunks)

    // TODO: remove later (for debugging)
    console.log(hexes)
    if (!hexes) {
        setHexData([ ...dummyHexes ])
        setMapChunks([ ...dummyMapPeices ])
    }

    return (
        <div className="PlayPage" >
            
            <h1><Link to="/setup" >{"<"}</Link> Play</h1>
            <PlayingBoard />
        </div>
    )
}