import React from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해
import { signup } from "../../apis";

function Signup() {
  const navigate = useNavigate();

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
  };

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
