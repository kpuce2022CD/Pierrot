import { Route, Routes } from "react-router-dom";
import React from "react";
import GameInfo from "./component/GameInfo/GameInfo";
// import Main from "./component/Main/Main";
import PlayerInfo from "./component/PlayerInfo/PlayerInfo";
import Guide from "./component/Guide/Guide";
// import Login from "./component/Login/Login";
import Graph from "./component/Graph/Graph";
import VideoUpload from "./component/VideUpload/VideoUpload";
import Opponent from "./component/PlayerInfo/Oppenent";

import Main from "page/Main";
import List from "page/List";
import Login from "page/Login";
import Signup from "page/Signup";
function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/game/list" element={<List />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* <Route path="/main" element={<Main />} /> */}
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/profile" element={<PlayerInfo />} />
      <Route path="/game" element={<GameInfo />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/graph/:id" element={<Graph />} />
      <Route path="/upload" element={<VideoUpload />} />

      <Route path="/profile/:id" element={<Opponent />} />
    </Routes>
  );
}

export default Router;
