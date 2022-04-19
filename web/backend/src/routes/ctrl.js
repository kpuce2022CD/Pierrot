const auth = {
  signup: (req, res) => {
    // const db = require("../config/database");
    if(!res){
      const member = new Member({
        loginId = req.body.loginId,
        loginPw = req.body.loginPw,
        name = req.body.name;
        age = req.body.age;
      })
    }else{
      console.log(req.body)
      Message.findOneAndUpdate({_id: req.body.key}, {$push : {message : req.body}},
      (err) => {
        if(err)
          console.log("Err : "+err)
      }
      )
    }

    console.log(req.body);
    db.query(
      "INSERT INTO member (email,passwd,`name`,age) VALUES (?,?,?,?)",
      [loginId, loginPw, name,age],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          if (result) {
            res.send(result);
          } else {
            res.send({ message: "signup faile" });
          }
        }
      }
    );
    db.end;
  },
  // Message.findOne({_id: req.body.key}, (err, document) => {
  //   if(!document){
  //     const message = new Message({
  //       _id: req.body.key, // 프로젝트 아이디 _ 데이터 아이디
  //       project_id : req.body.idx, // 프로젝트 아이디
  //       data_id : req.body.data_id, // 데이터 아이디
  //       message : req.body
  //     })

  //     message.save((err) => {
  //       if(err) return console.log(err)
  //     })
  //   }else{
  //     console.log(req.body)
  //     Message.findOneAndUpdate({_id: req.body.key}, {$push : {message : req.body}},
  //     (err) => {
  //       if(err)
  //         console.log("Err : "+err)
  //     }
  //     )
  //   }
  // })

  login: (req, res) => {
    const db = require("../config/database");
    const inputId = req.body.inputId,
      inputPw = req.body.inputPw;

    console.log(req.body);
    db.query(
      "SELECT * FROM member WHERE email=? AND passwd=?",
      [inputId, inputPw],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          if (result.length > 0) {
            res.send(result);
          } else {
            res.send({ message: "login faile" });
          }
        }
      }
    );
    db.end;
  },
};
const video = {
  upload: (req, res, next) => {
    const multer = require("multer");
    const upload = require("../config/fileupload");
    // FormData의 경우 req로 부터 데이터를 얻을수 없다.
    // upload 핸들러(multer)를 통해서 데이터를 읽을 수 있다
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return next(err);
      } else if (err) {
        return next(err);
      }
      console.log("원본파일명 : " + req.file.originalname);
      console.log("저장파일명 : " + req.file.filename);
      console.log("크기 : " + req.file.size);
      // console.log('경로 : ' + req.file.location) s3 업로드시 업로드 url을 가져옴
      return res.json({ success: 1 });
    });
  },
};

const game = {
  get_information : (req,res) =>{
    const db = require("../config/database");
    const loginId = req.body.loginId;

    console.log(req.body);
    db.query(
      "SELECT * FROM info_game",
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          if (result) {
            res.send(result);
          } else {
            res.send({ message: "signup faile" });
          }
        }
      }
    );
    db.end;
  }
}

module.exports = {
    auth,
    video,
    game,
};

