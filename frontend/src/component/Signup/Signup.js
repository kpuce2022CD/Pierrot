import React, { component, useState, useRef } from 'react';
import './Signup.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'


function Signup() {

    const [loginId, setLoginId] = useState('') //상태값 저장변수, 상태 값 갱신 변수 = useState(상태 초기값)
    const [loginPw, setLoginPw] = useState('')
    const [name, setName] = useState('')

    const navigate = useNavigate();
    const goLoginPage = () => {
        navigate("/");
    };

    const handleLoginId = (e) => {
        setLoginId(e.target.value)
    }

    const handleLoginPw = (e) => {
        setLoginPw(e.target.value)
    }
    
    const handleName = (e) => {
        setName(e.target.value)
    }

    const postMember = () =>{

        Axios.post('http://localhost:3001/postMember',{
            loginId:loginId,
            loginPw:loginPw,
            name:name
        }).then(() => {
            console.log("success");
        }).then(goLoginPage);
    };

    return(
    <div className='joinForm'>
    <h2 className='SignupText'>회원가입</h2>
    <div class="textForm">
        <input name="loginId" type="text" className="id" placeholder="아이디" value={loginId} onChange={handleLoginId}>
        </input>
    </div>
    <div class="textForm">
        <input name="loginPw" type="password" className="pw" placeholder="비밀번호" value={loginPw} onChange={handleLoginPw}>
        </input>
    </div>
    <div class="textForm">
        <input name="loginPwConfirm" type="password" className="pw" placeholder="비밀번호 확인">
        </input>
    </div>
    <div class="textForm">
        <input name="name" type="text" className="name" placeholder="이름" value={name} onChange={handleName}>
        </input>
    </div>
    <div class="textForm">
        <input name="email" type="text" className="email" placeholder="이메일">
        </input>
    </div>
    <div class="textForm">
        <input name="nickname" type="text" className="nickname" placeholder="닉네임">
        </input>
    </div>
    <div class="textForm">
        <input name="cellphoneNo" type="number" className="cellphoneNo" placeholder="전화번호">
        </input>
    </div>
    <input onClick={postMember} type="submit" className="btn" value="J O I N"/>
    </div>
    )
}

export default Signup; 