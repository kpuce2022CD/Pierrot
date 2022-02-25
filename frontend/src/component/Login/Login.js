import React, { Component, useState } from "react";
import "./Login.css";
import Footer from "../../Layout/Footer";
import { useNavigate } from "react-router-dom";


function Login() {

    const [inputId, setInputId] = useState('') //상태값 저장변수, 상태 값 갱신 변수 = useState(상태 초기값)
    const [inputPw, setInputPw] = useState('')

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const navigate = useNavigate();
    const goMainPage = () => {
        navigate("/Main");
    };
    const goSignupPage = () => {
        navigate("/Signup");
    };


    return (
        <div className="loginID">
        <form style={{ display: 'flex', flexDirection: 'column' }} >
            <label className="loginText">Email</label>
            <input type="email" className="login_id" value={inputId} onChange={handleInputId} />
            <label className="loginText">Password</label>
            <input type="password" className="login_id" value={inputPw} onChange={handleInputPw} />
            <br />
            <div onClick={goMainPage} className="loginButton">Signin</div>
            <div onClick={goSignupPage} className="loginButton">Signup</div>
            </form>
        </div>
    );
}

export default Login;