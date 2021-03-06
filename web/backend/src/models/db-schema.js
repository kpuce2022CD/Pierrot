const mongoose = require("mongoose");

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
    role: {
        type: Number,
        default: 0,
    },
    odds : {
        type: Number,
        default:0,
    },
    game:[{
        game:String,
        opponent:String,
        win:Boolean,
        video_key:String,
        date:String,
        
    }]
});

const gameSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    video_key: {
        type: String,
        required: true,
    },
    winner:{
        type:String,
        required:true,
    },
    opponent:{
        type:String,
    },
    date : {
        type:String,
    },
    bounce:[{
        idx:Number,
        x:Number,
        y:Number,
        v:Number,
        court_name:String
    }],
    next_bounce:[{
        front_dueceside_left : Array,
        front_dueceside_center : Array,
        front_dueceside_right : Array,
        front_adside_left : Array,
        front_adside_center : Array,
        front_adside_right : Array,
    }]
    
});
const member = mongoose.model("member", memberSchema);
const game = mongoose.model("game", gameSchema);

module.exports = { member, game };
