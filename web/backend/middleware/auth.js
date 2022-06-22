const { memberSchema } = require("../src/models/db-schema");

const auth = (req, res, next) => {
  console.log("auth");
  if (req.session.user) {
    memberSchema.findOne({ email: req.session.user }, (err, user) => {
      if (user) {
        req.memberSchema = user;
        console.log("user",user);
        next();
      }
    });
  } else {
    return res.json({ success: false });
  }
};

module.exports = { auth };
