import { useDispatch, useSelector } from "react-redux";
import PlayingBoard from "../components/PlayingBoard";
import { Link } from "react-router-dom";
import { setDummyData } from "../config/boardSlice";

export default function PlayPage() {

    const dispatch = useDispatch()

    let hexes = useSelector(s => s.board.hexes)
    let peices = useSelector(s => s.board.mapChunks)

    

    return (
        <div className="PlayPage" >
            
            <h1><Link to="/setup" >{"<"}</Link> Play</h1>
            <PlayingBoard />
        </div>
    )
}