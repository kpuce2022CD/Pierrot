import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해
import Axios from "axios";
import { login } from "../../apis";

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
  const onSubmit = async (data) => {
    console.log(data);
    const res = await login(data.email, data.password);
    console.log(res);
    if (res.success) {
      navigate("/main");
    } else {
      alert(res.message);
    }
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
              {...register("email", { required: true })}
            />
            <label>Email</label>
          </div>
          <div className="int-area">
            <input
              type="password"
              autoComplete="off"
              required
              {...register("password", { required: true })}
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
