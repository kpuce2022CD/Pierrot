const schema = require('../../models/db-schema');
const fs = require('fs');
const CSV = require('comma-separated-values');

const game ={
    upload_game : async (req,res) => {
        console.log("start upload_game");

        let user_position = fs.readFileSync(req.files[1].path,"utf-8");
        user_position = JSON.parse(user_position);
        let opponent_position = fs.readFileSync(req.files[2].path,"utf-8");
        opponent_position = JSON.parse(opponent_position);
        const players_position = {user:user_position,opponent:opponent_position};
        //get csv file
        const csv = fs.readFileSync(req.files[0].path,"utf-8");
        // console.log(csv);

        //csv 읽을수 있는 형태로 변환
        const csvs = csvToString(csv);

        //각 오브젝트로 변환
        //ex) front_adside_right : [back_dueceside_left,~]
        const court_list = predict_next_court(csvs);
        console.log(court_list);

        //findAndUpdate from mongodb
        schema.game.findOneAndUpdate({_id : req.body._id},
            {$set:{bounce:csvs,next_bounce:court_list,player_position:players_position}},function(err,doc){
            if(err){
                console.log("Something wrong when updating data!");
                res.json({
                    sucess:false,
                    message: "게임정보업로드에 실패했습니다."
                });
            }
            res.json({
                success : true
            });
        });


        
    },

    download_all_game : async (req,res) =>{
        console.log("start download_all_game")
        try{
            const gameData = await schema.game.find({
                email:req.body.email
            });
      
            console.log(gameData);
            console.log("finish download_all_game")
            res.json({
                success: true,
                gameData: gameData
            });
          }catch(err){
            res.json({
                success: false,
                message: "게임정보를 가져오는데 실패했습니다."
            });
          }
    },

    download_game_by_id : async (req,res)=>{
        console.log("start download_game_by_id");
        try{
            console.log("_id :",req.body._id);
            const gameData = await schema.game.findOne({
                _id : req.body._id
            });

            console.log(gameData);
            console.log("finish download_all_game")
            res.json({
                success: true,
                gameData: gameData
            });
          }catch(err){
            res.json({
                success: false,
                message: "게임정보를 가져오는데 실패했습니다."
            });
        }
    },

    download_all : async (req,res) =>{
        console.log("start download_all")
        try{
            const gameData = await schema.game.find({});
            // await schema.game.findOne()
      
            console.log(gameData);
            console.log("finish download_all");
            res.json({
                success: true,
                gameData: gameData
            });
          }catch(err){
            res.json({
                success: false,
                message: "게임정보를 가져오는데 실패했습니다."
            });
          }
    },

    delete_game_by_id : (req,res) =>{

    }
}

const csvToString = (csv) =>{
    console.log("start stringToCsv");
    const info = new CSV(csv, {header: true}).parse();
    console.log(info);
    console.log("finish stringToCsv");
    return info;
}

const predict_next_court = (csvs) =>{
    console.log("start predict_next_court");
    let ll = [];
    let lc = [];
    let lr = [];
    let rl = [];
    let rc = [];
    let rr = [];

    for(index = 0; index < csvs.length-1;index++){
        switch (csvs[index].court_name) {
            case 'front_dueceside_left':
                ll.push(csvs[index+1].court_name);
                break;
            case 'front_dueceside_center':
                lc.push(csvs[index+1].court_name);
                break;
            case 'front_dueceside_right':
                lr.push(csvs[index+1].court_name);
                break;
            case 'front_adside_left':
                rl.push(csvs[index+1].court_name);
                break;
            case 'front_adside_center':
                rc.push(csvs[index+1].court_name);
                break;
            case 'front_adside_right':
                rr.push(csvs[index+1].court_name);
                break;
        }
    }

    const next_bounce = {front_dueceside_left:ll,front_dueceside_center:lc,front_dueceside_right:lr,front_adside_left:rl,front_adside_center:rc,front_adside_right:rr};
    console.log("finish predict_court");
    return next_bounce;
}

module.exports = {game}