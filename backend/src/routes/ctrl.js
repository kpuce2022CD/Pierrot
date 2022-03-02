
const signup = (req,res)=>{
    const db = require('../../database');
    const loginId = req.body.loginId,
        loginPw = req.body.loginPw,
        name = req.body.name;

    console.log(req.body)
    db.query(
        'INSERT INTO member (email,password,name) VALUES (?,?,?)', 
        [loginId,loginPw,name],
        (err, result) => {
            if (err){
                console.log(err);
            }else{
                res.send("Values inserted");
            }
        }
    );
    db.end;
};

const login = (req,res)=>{
    const db = require('../../database');
    const inputId = req.body.inputId,
        inputPw = req.body.inputPw;

    console.log(req.body);
    db.query(
        'SELECT * FROM member WHERE email=? AND password=?',
        [inputId,inputPw],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send("login success");
            }
        }
    );
    db.end;
};

module.exports = {
    signup,
    login,
};