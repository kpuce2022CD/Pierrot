import { Route, Routes } from "react-router-dom";
import GameInfo from "./component/GameInfo/GameInfo";
import Main from "./component/Main/main";
import PlayerInfo from "./component/PlayerInfo/PlayerInfo";
import Guide from "./component/Guide/Guide";
import Login from "./component/Login/Login";
import Graph from "./component/Graph/Graph";
import Signup from "./component/Signup/Signup";
import VideoUpload from "./component/vidoeUpload/videoUpload";

function Router() {
    return (
    <Routes>
    <Route path="/main" element={<Main />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/playerinfo" element={<PlayerInfo />} />
    <Route path="/gameinfo" element={<GameInfo />} />
    <Route path="/guide" element={<Guide />} />
    <Route path="/graph" element={<Graph />} />
    <Route path="/" element={<VideoUpload />} />
    </Routes>
    );
}

export default Router;