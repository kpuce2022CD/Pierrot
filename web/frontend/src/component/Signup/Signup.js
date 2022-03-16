import React, { component, useState, useRef } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해
import Axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate("/");
  };
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();

  // react hook form
  const onSubmit = (data) => {
    console.log(data);
    navigate("/");
  };

  const onError = (error) => {
    console.log(error);
    error.next("label").addClass("warning");
  };

  const postMember = () =>{
    Axios.post('http://localhost:3001/postMember',{
      //보낼 정보
    }).then(() => {
        console.log("success");
    }).then(goLoginPage);
  };

  return (
    <div className="login-page">
      <section className="login-form">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="singup-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("userId")}
            />
            <label>Email</label>
          </div>
          <div className="singup-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("userPw")}
            />
            <label>Pw</label>
          </div>
          <div className="singup-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("checkUserPw")}
            />
            <label>Check PW</label>
          </div>
          <div className="singup-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("userName")}
            />
            <label>Name</label>
          </div>
          <div className="singup-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("userAge")}
            />
            <label>Age</label>
          </div>
          <div className="btn-area">
            <button type="submit">SignUp</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Signup;
