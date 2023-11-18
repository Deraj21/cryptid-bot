import BoardSetup from "../components/BoardSetup"
import PlayersSetup from "../components/PlayersSetup"

export default function SetupPage() {
    return (
        <div className="SetupPage" >
            <h1>Setup Players</h1>
            <PlayersSetup />
            
            <hr/>

            <BoardSetup />
        </div>
    )
}