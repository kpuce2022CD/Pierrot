import Footer from "../../Layout/Footer";
import Layout from "../../Layout/Layout";
import React, { Component, useState } from "react";
import "./Guide.css";

const Guide = () => {
  return (
    <Layout>
      <div className="guide">
        <li>회원가입하기</li>
        <li>로그인하기</li>
        <li>회원가입하기</li>
        <li>회원가입하기</li>
      </div>
    </Layout>
  );
};

export default Guide;
