const express = require('express')
const app = express()

const mysql = require('mysql')
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "2019152",
    database: "tennisanalysis",
});

app.post('/postMember',(req,res)=>{
    const id = req.body.id
    const psword = req.body.psword

    db.query(
        'INSERT INTO member (id,psword) VALUES (?,?)', 
        [id,psword],
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