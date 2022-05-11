const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    passwd:{
        type: String,
        required: true
    },
    name:{
        type: String,
    },
    age:{
        type: Number,
    },
});

const gameSchema = mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    video_location:{
        type:String,
        required: true
    }
})

const member = mongoose.model('member', memberSchema);
const game = mongoose.model('game',gameSchema);

module.exports = {member,game}