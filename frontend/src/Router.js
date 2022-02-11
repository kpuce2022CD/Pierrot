import { Route, Routes } from "react-router-dom";
import GameInfo from "./component/GameInfo/GameInfo";
import Main from "./component/Main/Main";
import PlayerInfo from "./component/PlayerInfo/PlayerInfo";
import Guide from "./component/Guide/Guide";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/playerinfo" element={<PlayerInfo />} />
      <Route path="/gameinfo" element={<GameInfo />} />
      <Route path="/guide" element={<Guide />} />
    </Routes>
  );
}

export default Router;
