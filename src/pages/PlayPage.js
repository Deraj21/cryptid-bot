import PlayingBoard from "../components/PlayingBoard";
import { Link } from "react-router-dom";

export default function PlayPage() {

    return (
        <div className="PlayPage" >
            
            <h1><Link to="/setup" >{"<"}</Link> Play</h1>
            <PlayingBoard />
        </div>
    )
}