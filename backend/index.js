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
    const loginId = req.body.loginId;
    const loginPw = req.body.loginPw;
    const name = req.body.name;

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


app.listen(3001,() =>{
    console.log("서버 가동");
});