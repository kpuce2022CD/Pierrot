const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    email:{
        type: String, // 프로젝트 아이디_데이터 아이디 -> 고유해짐
        required: true
    },
    passwd:{
        type: String,
        required: true
    },
    name:{
        type: String, // 데이터 아이디
    },
    age:{
        type: Number,
    },
})

const member = mongoose.model('member', memberSchema)

module.exports = {member}