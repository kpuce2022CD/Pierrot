
const auth = {
    signup : (req,res)=>{
        const db = require('../config/database');
        const loginId = req.body.loginId,
            loginPw = req.body.loginPw,
            name = req.body.name;

        console.log(req.body)
        db.query(
            'INSERT INTO member (email,password,name) VALUES (?,?,?)', 
            [loginId,loginPw,name],
            (err, result) => {
                if (err){
                    res.send({err: err});
                }else{
                    if(result){
                        res.send(result);
                    }else{
                        res.send({message:"signup faile"})
                    }
                }
            }
        );
        db.end;
    },

    login : (req,res)=>{
        const db = require('../config/database');
        const inputId = req.body.inputId,
        inputPw = req.body.inputPw;
    
        console.log(req.body);
        db.query(
            'SELECT * FROM member WHERE email=? AND password=?',
            [inputId,inputPw],
            (err, result) => {
                if(err){
                    res.send({err:err});
                }else{
                    if(result.length > 0){
                        res.send(result);
                    }else{
                        res.send({message:"login faile"})
                    }
                }
            }
        );
        db.end;

    },
};

module.exports = {
    auth,

};