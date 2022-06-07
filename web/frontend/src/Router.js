import { Route, Routes } from "react-router-dom";
import React from "react";
import GameInfo from "./component/GameInfo/GameInfo";
import Main from "./component/Main/Main";
import PlayerInfo from "./component/PlayerInfo/PlayerInfo";
import Guide from "./component/Guide/Guide";
import Login from "./component/Login/Login";
import Graph from "./component/Graph/Graph";
import Signup from "./component/Signup/Signup";
import VideoUpload from "./component/VideUpload/VideoUpload";

import Opponent from "./component/PlayerInfo/Oppenent";

function Router() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<PlayerInfo />} />
      <Route path="/game" element={<GameInfo />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/graph" element={<Graph />} />
      <Route path="/upload" element={<VideoUpload />} />

      <Route path="/profile/:id" element={<Opponent />} />
    </Routes>
  );
}

export default Router;
