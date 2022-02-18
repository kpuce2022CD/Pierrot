import React, { Component, useState, useEffect, useRef } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해

const Login = () => {
  const navigate = useNavigate();
  const goMainPage = () => {
    navigate("/Main");
  };
  const goSignupPage = () => {
    navigate("/Signup");
  };

  const [id, setID] = useState("");
  const [pw, setPw] = useState("");

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();

  // react hook form
  const onSubmit = (data) => console.log(data);

  return (
    <div className="login-page">
      <section className="login-form">
        <h1>TENNIS</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="int-area">
            <input type="text" name="id" id="id" autoComplete="off" required />
            <label htmlFor="id">Email</label>
          </div>
          <div className="int-area">
            <input
              type="password"
              name="pw"
              id="pw"
              autoComplete="off"
              required
            />
            <label htmlFor="pw">Password</label>
          </div>
          <div className="btn-area">
            <button type="submit">LOGIN</button>
          </div>
          <div className="caption">
            <Link to="/signup">SIGNUP</Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
