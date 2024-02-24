import { useDispatch, useSelector } from "react-redux";
import PlayingBoard from "../components/PlayingBoard";
import { Link } from "react-router-dom";
import { setDummyData } from "../config/boardSlice";
import BotToolbar from "../components/BotToolbar";

export default function PlayPage() {

    const dispatch = useDispatch()

    let hexes = useSelector(s => s.board.hexes)
    let peices = useSelector(s => s.board.mapChunks)

    

    return (
        <div className="PlayPage" >
            
            <h3><Link to="/setup" >{"< back to setup"}</Link></h3>
            <PlayingBoard />
        </div>
    )
}