const schema = require("../../models/db-schema");
const { member } = require("../../models/db-schema");

const auth = {
  signup: async (req, res) => {
    console.log(req.body);
    const member = new schema.member({
      email: req.body.email,
      passwd: req.body.passwd,
      name: req.body.name,
      age: req.body.age,
    });
    try {
      const savedMember = await member.save();
      res.json({ success: true, message: "성공" });
      console.log(savedMember);
    } catch (err) {
      res.json({ success: false, message: err });
      console.log(err);
    }
  },

  login: async (req, res) => {
    console.log(req.body);
    if (req.session.user) {
      console.log(req.session);
      req.session.destroy();
      return res.json({ success: false, message: "로그인 상태" });
    }
    member.findOne({ email: req.body.email }, (err, user) => {
      // console.log("user", user);
      if (!user) {
        return res.json({
          success: false,
          message: "유저가 없습니다",
        });
      }
      console.log("password", user.passwd, req.body.password);
      if (user.passwd == req.body.password) {
        console.log("password collect");
        req.session.user = user.email;
        res.json({ success: true });
      } else {
        console.log("password false");
        return res.json({
          success: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
    });
  },

  logout: async (req, res) => {
    if (req.session.user) {
      req.session.destroy((err) => {
        if (err) throw err;
        res.json({ success: true });
      });
    } else {
      res.json({ success: false });
    }
  },
  auth: async (req, res) => {
    if (req.session.user) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  },

  get_info : async (req, res) =>{
    console.log("start get_info");

    const info =  await member.findOne({ 
      email: req.body.email });
    
    const num_game = info.odds.length;
    let count = 0;

    for(i in info.odds){
      if(info.odds[i].win === true){
        count++;
      }
    }

    JSON.stringify(info);

    info.__v = count/num_game;
    // console.log(info.current);

    res.json(info);
  }
};

module.exports = { auth };
