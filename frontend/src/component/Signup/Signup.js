import React, { component, useState, useRef } from 'react';
import axios from 'axios';
import './Sign.css';
import Footer from "../../Layout/Footer";
import { useNavigate } from "react-router-dom";

function Signup() {
    
    const Id = useRef("");
    const Password = useRef("");
    const ConfirmPassword = useRef("");
    const Name = useRef("");
    const Birth= useRef("");
    const Belong  = useRef("");

    const [IdMessage, setIdMessage] = useState("");
    const [NameMessage, setNameMessage] = useState("");
    const [PasswordMessage, setPasswordMessage] = useState("");
    const [ConfirmPasswordMessage, setConfirmPasswordMessage] = useState("");
    const [BirthMessage, setBirthMessage] = useState("");
    const [BelongMessage, setBelongMessage] = useState("");
    const [Nothing, setNothing] = useState("");


    

    if (result.data.Result === "Exist") {
        setIdMessage("이미 사용중인 ID입니다.");
    } else if (result.data.Result === "WrongInput") {
        setIdMessage("아이디는 영어, 숫자 4 ~ 20글자로만 가능합니다.");
    } else if (result.data.Result === "NO") {
        setIdMessage("");
    } else {
        setIdMessage("아이디를 입력해주세요");
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    
    const onSubmit = (event) => {
        event.preventDefault()
        if(password !== confirmPassword) {
        return alert('비밀번호와 비밀번호확인은 같아야 합니다.')
        }
    }
    
    return (
        <div class="Signup">
        <form>
            <div><input name="name" type="text" placeholder="이름" value={name} onChange={onNameHandler} class="loginregister__input"/></div>
            <div><input name="email" type="email" placeholder="이메일" value={email} onChange={onEmailHandler} class="loginregister__input"/></div>
            <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} class="loginregister__input"/></div>
            <div><input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={onConfirmPasswordHandler} class="loginregister__input"/></div>
            <div><button type="submit" onSubmit={onSubmit} class="loginregister__button">계정 생성하기</button></div>
        </form>
        </div>
    );
}

export default Signup; 