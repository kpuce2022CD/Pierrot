const schema = require('../../models/db-schema');

const auth = {
  
  signup: async (req, res) => {

    const member = new schema.member({
      email: req.body.email,
      passwd: req.body.passwd,
      name: req.body.name,
      age: req.body.age,
    });
    try{
      const savedMember = await member.save();
      res.json(savedMember);
      console.log(savedMember);
    }catch(err){
      res.json({message : err});
      console.log(err);
    };
  },

  login: async (req, res) => {
    try{
      const checkMember = await schema.member.findOne({
        email:req.body.email,
        passwd:req.body.passwd});

      console.log(checkMember);
      res.json(checkMember._id);
    }catch(err){
      res.json({message : err});
      console.log(err);
    }
  }
};

module.exports ={auth};