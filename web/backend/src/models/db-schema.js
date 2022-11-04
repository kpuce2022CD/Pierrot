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
    //총 승리한 횟수
    odds : {
        type: Number,
        default:0,
    },
    //     //사용자 기준 승리여부
    //경기 전적
    game:[{
        //??
        game:String,
        //상대방 이름
        opponent:String,
        //사용자 기준 승리여부
        win:Boolean,
        //비디오 url
        video_key:String,
        //경기 날짜
        date:String,
        
    }]
});

const gameSchema = mongoose.Schema({
    game_num:{
        type:Number,
        required: true,
    },
    //사용자 email
    email: {
        type: String,
        required: true,
    },
    //경기 영상url
    video_key: {
        type: String,
        required: true,
    },
    //승자이름
    winner:{
        type:String,
        required:true,
    },
    //상대방 이름
    opponent:{
        type:String,
    },

    //경기 날짜
    date : {
        type:String,
    },

    //공바운드
    bounce:[{
        idx:Number,
        x:Number,
        y:Number,
        v:Number,
        court_name:String
    }],
    //경기장 위치별 공 다음 바운드
    next_bounce:{
        front_dueceside_left : Array,
        front_dueceside_center : Array,
        front_dueceside_right : Array,
        front_adside_left : Array,
        front_adside_center : Array,
        front_adside_right : Array,
    },
    
    player_position:{
        user:Array,
        opponent:Array,
        user_distance:Number,
        opponent_distance:Number,
    }
    
});
const member = mongoose.model("member", memberSchema);
const game = mongoose.model("game", gameSchema);

module.exports = { member, game };
