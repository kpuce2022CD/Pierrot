const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "2019152",
    database: "tennisanalysis",
});

app.use(cors());
app.use(express.json());

app.post('/postMember',(req,res)=>{
    const loginId = req.body.loginId,
        loginPw = req.body.loginPw,
        name = req.body.name;

    console.log(req.body)
    db.query(
        'INSERT INTO member (email,password,name) VALUES (?,?,?)', 
        [loginId,loginPw,name],
        (err, result) => {
            if (err){
                console.log(err)
            }else{
                res.send("Values inserted")
            }
        }
    );
});

app.get('/getMember',(req,res)=>{
    const inputId = req.body.inputId,
        inputPw = req.body.inputPw;

    console.log(req.body);
    db.query(
        'SELECT * FROM member',
        // [inputId,inputPw],
        (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        }
    );
});


app.listen(3001,() =>{
    console.log("서버 가동");
});