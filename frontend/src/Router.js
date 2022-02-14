import { Route, Routes } from "react-router-dom";
import GameInfo from "./component/GameInfo/GameInfo";
import Main from "./component/Main/Main";
import PlayerInfo from "./component/PlayerInfo/PlayerInfo";
import Guide from "./component/Guide/Guide";
import Login from "./component/Login/Login";

function Router() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Login />} />
      <Route path="/playerinfo" element={<PlayerInfo />} />
      <Route path="/gameinfo" element={<GameInfo />} />
      <Route path="/guide" element={<Guide />} />
    </Routes>
  );
}

export default Router;
