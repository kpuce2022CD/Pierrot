import React, { Component, useState, useEffect, useRef } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해
import Axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const goSignupPage = () => {
    navigate("/signup");
  };

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();

  // react hook form
  const onSubmit = (data) => {
    console.log(data);
    navigate("/main");
  };

  const onError = (error) => {
    console.log(error);
    error.next("label").addClass("warning");
  };

  const getMember = () =>{
    Axios.post('http://localhost:3001/getMember',{
    //보낼데이터
    }).then((response) =>{
        if(response.data[0]){
            console.log(response);
            onSubmit(response.data[0]);
        }else{
            console.log("login failed");
        }
    });
  };

  return (
    <div className="login-page">
      <section className="login-form">
        <h1>TENNIS</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="int-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("userId", { required: true })}
            />
            <label>Email</label>
          </div>
          <div className="int-area">
            <input
              type="password"
              autoComplete="off"
              required
              {...register("userPw", { required: true })}
            />
            <label>Password</label>
          </div>
          <div className="btn-area">
            <button type="submit">LOGIN</button>
          </div>
          <div className="caption">
            <Link to="/signup" onClick={goSignupPage}>
              SIGNUP
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
