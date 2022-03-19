
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

const video = {
    upload : (req, res, next) => {
        const multer = require('multer');
        const upload = require('../config/fileupload');
        // FormData의 경우 req로 부터 데이터를 얻을수 없다.
        // upload 핸들러(multer)를 통해서 데이터를 읽을 수 있다
        upload(req, res, function(err) {
            if (err instanceof multer.MulterError) {
            return next(err);
            } else if (err) {
            return next(err);
            }
            console.log('원본파일명 : ' + req.file.originalname)
            console.log('저장파일명 : ' + req.file.filename)
            console.log('크기 : ' + req.file.size)
            // console.log('경로 : ' + req.file.location) s3 업로드시 업로드 url을 가져옴
            return res.json({success:1});
        });
    },
  
}

module.exports = {
    auth,
    vidoe,
};