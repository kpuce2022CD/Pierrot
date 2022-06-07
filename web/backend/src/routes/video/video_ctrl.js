require('dotenv').config();
const schema = require('../../models/db-schema');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const video ={
    //upload video function
    upload_video : async (req,res) => {
        
        //get video
        const file = req.file;
        const body = req.body;
        const fileStream = fs.createReadStream(file.path)
        let win = true;
        if(body.winner === body.opponent){
            win = false;
        }

        //s3에 들어갈 자료
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename+".mp4"
        };
        try{
            //upload video file into S3
            const result = await s3.upload(uploadParams).promise();
            console.log(result);

            //upload game Info into mongodb
            const check_upload = await upload_db_games(body.email, file.filename+".mp4",body.winner,body.opponent,body.date);
            await upload_db_member(body.email,file.filename+".mp4",win,body.opponent,body.date);
            res.json(check_upload);
        }catch(err){
            console.log(err);
            res.json({
                message: err
            });
        }
    },

    //download video function
    download_video: async(req,res) =>{
        //사용자 id와 일치하는 document 모두 찾기
        const game_file = await get_db_games(req.body.email);
        let readStream = null;

        
        //사용자 id와 일치하는 video file 모두 가져오기 from S3
        for(var key in game_file){
            var fileKey = game_file[key];
            console.log(fileKey);

            //
            const downloadParams = {
                Key: fileKey.video_key,
                Bucket: bucketName
            };
            console.log(downloadParams);

            //get video file from S3
            readStream = s3.getObject(downloadParams).createReadStream();
            console.log(readStream);
        }
        
        //비디오파일 내보내기
        readStream.pipe(res);
        
    },
}

const upload_db_games = (email,video_key,winner,opponent,date) => {
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
};

const get_db_games = async(email) => {
    try{
        const gamefile = await schema.game.find({
          email: email});
  
        console.log(gamefile);
        return gamefile;
      }catch(err){
        console.log(err);
      }
};

const upload_db_member = async (email,file_name,win,opponent,date) =>{
    const odds = {
        video_key : file_name,
        win : win,
        opponent : opponent,
        date : date,
    }
    try{
        const member = await schema.member.updateOne(
            {email: email},
            {$push : {odds : odds}});

        return member;
      }catch(err){
        console.log(err);
      }
}

module.exports = {video}