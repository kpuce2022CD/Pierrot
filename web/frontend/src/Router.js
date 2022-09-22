import { Route, Routes } from "react-router-dom";
import React from "react";
import Main from "page/Main";
import List from "page/List";
import Login from "page/Login";
import Signup from "page/Signup";
import Profile from "page/Profile";
import Upload from "page/Upload";
import About from "page/About";
import Setting from "page/Setting";
function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/game/list" element={<List />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/about" element={<About />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  );
}

export default Router;
