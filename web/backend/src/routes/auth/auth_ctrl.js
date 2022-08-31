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
    try {
      member.findOne(
        { email: req.body.email, passwd: req.body.password },
        (err, user) => {
          console.log("user", user);
          if (!user) {
            res.json({
              success: false,
              message: "로그인에 실패했습니다",
            });
          }
          res.json({
            success: true,
          });
        }
      );
    } catch (err) {
      res.json({
        succes: false,
        message: err,
      });
    }
  },

  logout: async (req, res) => {
    if (req.body.email) {
      req.session.destroy((err) => {
        if (err) throw err;
        res.json({ success: true });
      });
    } else {
      res.json({ success: false });
    }
  },
  auth: async (req, res) => {
    if (req.body.email) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  },

  get_info: async (req, res) => {
    console.log("start get_info");
    const { email } = req.params;
    try {
      const user = await schema.member.findOne({
        email: email,
      });
      const game = await schema.game.find({
        email: email,
      });

      const num_game = user.game.length;
      let count = 0;
      for (i in user.game) {
        if (user.game[i].win === true) {
          count++;
        }
      }
      JSON.stringify(user);
      user.__v = count / num_game;

      res.json({
        email: user.email,
        name: user.name,
        age: user.age,
        odds: user.__v,
        game: game,
      });
    } catch (err) {
      res.json({
        err: err,
      });
    }
  },
};

module.exports = { auth };
