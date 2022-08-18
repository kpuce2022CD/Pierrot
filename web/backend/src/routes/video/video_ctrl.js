require('dotenv').config();
const schema = require('../../models/db-schema');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const video ={
    upload_video : async (req,res) => {
        console.log("start upload_video");
        //get video
        const fileStream = fs.createReadStream(req.file.path);
        let win = true;
        if(req.body.winner === req.body.opponent){
            win = false;
        }

        //s3에 들어갈 자료
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: req.file.filename+".mp4"
        };

        try{
            //upload video file into S3
            s3.upload(uploadParams);

            //upload game Info into mongodb
            upload_db_games(req.body.email, req.file.filename+".mp4",req.body.winner,req.body.opponent,req.body.date);
            upload_db_member(req.body.email,req.file.filename+".mp4",win,req.body.opponent,req.body.date);
            
            res.json({
                success: true
            });
        }catch(err){
            console.log(err);
            res.json({
                success: false,
                message: "비디오 업로드에 실패했습니다."
            });
        }

        console.log("finish upload_video");
    },

    //download video function
    download_video: async(req,res) =>{
        console.log("start download_video");

        //사용자 id와 일치하는 document 모두 찾기
        const game_file = await get_db_games(req.body._id);
        let readStream = null;

        try{
            //사용자 id와 일치하는 video file 모두 가져오기 from S3
            for(var key in game_file){
                var fileKey = game_file[key];
                console.log(fileKey);
                const downloadParams = {
                    Key: fileKey.video_key,
                    Bucket: bucketName
                };
                console.log("downloadParams :",downloadParams);

                //get video file from S3
                readStream = s3.getObject(downloadParams).createReadStream();
            }
        }catch(err){
            res.json({
                success: false,
                message: "게임정보를 불러오는데 실패했습니다." 
            })
       }
        
       console.log("finish download_video");
        //비디오파일 내보내기
        readStream.pipe(res);
    },
}

const upload_db_games = (email,video_key,winner,opponent,date) => {
    console.log("start upload_db_games");
    const game = new schema.game({
        email: email,
        video_key : video_key,
        winner : winner,
        opponent : opponent,
        date:date,
      });
      try{
        const savedGame = game.save();
        console.log(savedGame);
      }catch(err){
        console.log(err);
      };
      console.log("finish upload_db_games");
};

const get_db_games = async(_id) => {
    console.log("start get_db_games");
    try{
        const gamefile = await schema.game.find({
          _id: _id});
        console.log("finish get_db_games");
        return gamefile;
      }catch(err){
        console.log(err);
      }

};

const upload_db_member = async (email,file_name,win,opponent,date) =>{
    console.log("start upload_db_member");
    const game = {
        video_key : file_name,
        win : win,
        opponent : opponent,
        date : date,
    }
    try{
        const member = await schema.member.updateOne(
            {email: email},
            {$push : {game : game}});

        return member;
      }catch(err){
        console.log(err);
      }
    console.log("finish upload_db_member");
}

module.exports = {video}