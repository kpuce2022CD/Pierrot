import React, { component, useState, useRef } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해
import Axios from "axios";
import { signup } from "../../apis";

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
  const onSubmit = async (data) => {
    console.log(data);
    if (data.pw !== data.checkPw) {
      alert("비밀번호를 확인해주세요");
      return;
    }
    const res = await signup(data.email, data.pw, data.name, data.age);
    console.log("res", res);
    if (res.success) {
      alert(res.message);
      navigate("/");
    } else {
      alert(res.message);
    }
    // postMember(data);
    // navigate("/");
  };

  const onError = (error) => {
    console.log(error);
    error.next("label").addClass("warning");
  };

  // const postMember = (data) =>{
  //   Axios.post('http://localhost:3001/postMember',{
  //     loginId : data.loginId,
  //     loginPw : data.loginPw,
  //     name : data.name,
  //     age : data.userAge,
  //   }).then(() => {
  //       console.log("success");
  //   }).then(goLoginPage);
  // };

  return (
    <div className="login-page">
      <section className="login-form">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="singup-area">
            <input
              type="email"
              autoComplete="off"
              required
              {...register("email")}
            />
            <label>Email</label>
          </div>
          <div className="singup-area">
            <input
              type="password"
              autoComplete="off"
              required
              {...register("pw")}
            />
            <label>Pw</label>
          </div>
          <div className="singup-area">
            <input
              type="password"
              autoComplete="off"
              required
              {...register("checkPw")}
            />
            <label>Check PW</label>
          </div>
          <div className="singup-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("name")}
            />
            <label>Name</label>
          </div>
          <div className="singup-area">
            <input
              type="number"
              autoComplete="off"
              required
              {...register("age")}
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
