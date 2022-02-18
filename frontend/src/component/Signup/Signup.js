import React, { component, useState, useRef } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate("/");
  };

  return (
    <div className="joinForm">
      <h2 className="SignupText">회원가입</h2>
      <div className="textForm">
        <input
          name="loginId"
          type="text"
          className="id"
          placeholder="아이디"
        ></input>
      </div>
      <div className="textForm">
        <input
          name="loginPw"
          type="password"
          className="pw"
          placeholder="비밀번호"
        ></input>
      </div>
      <div className="textForm">
        <input
          name="loginPwConfirm"
          type="password"
          className="pw"
          placeholder="비밀번호 확인"
        ></input>
      </div>
      <div className="textForm">
        <input
          name="name"
          type="text"
          className="name"
          placeholder="이름"
        ></input>
      </div>
      <div className="textForm">
        <input
          name="email"
          type="text"
          className="email"
          placeholder="이메일"
        ></input>
      </div>
      <div className="textForm">
        <input
          name="nickname"
          type="text"
          className="nickname"
          placeholder="닉네임"
        ></input>
      </div>
      <div className="textForm">
        <input
          name="cellphoneNo"
          type="number"
          className="cellphoneNo"
          placeholder="전화번호"
        ></input>
      </div>
      <input
        onClick={goLoginPage}
        type="submit"
        className="btn"
        value="J O I N"
      />
    </div>
  );
}

export default Signup;
