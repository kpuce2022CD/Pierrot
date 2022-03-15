import React, { Component, useState, useEffect, useRef } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해

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
