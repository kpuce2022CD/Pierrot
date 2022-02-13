import { Route, Routes } from "react-router-dom";
import GameInfo from "./component/GameInfo/GameInfo";
import Main from "./component/Main/Main";
import PlayerInfo from "./component/PlayerInfo/PlayerInfo";
import Guide from "./component/Guide/Guide";
import Login from "./component/Login&Singup/Login";
import Graph from "./component/Graph/Graph";

function Router() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Login />} />
      <Route path="/playerinfo" element={<PlayerInfo />} />
      <Route path="/gameinfo" element={<GameInfo />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/graph" element={<Graph />} />
    </Routes>
  );
}

export default Router;
