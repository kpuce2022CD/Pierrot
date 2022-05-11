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

const upload_db_games = async(email,video_location) => {
    const game = new schema.game({
        email: email,
        video_location : video_location
      });
      try{
        const savedGame = await game.save();
      //   res.json(savedMember);
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

const video ={
    upload_video : async (req,res) => {
        const file = req.file;
        console.log(file);

        const fileStream = fs.createReadStream(file.path)

        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename
        };
        try{
            const result = await s3.upload(uploadParams).promise();
            console.log(result);

            const check_upload = upload_db_games(req.body.email, result.Location);
            res.json(check_upload);
        }catch(err){
            console.log(err);
            res.json({
                message: err
            });
        }
    },

    download_video: async(req,res) =>{
        const game_file = await get_db_games(req.body.email);
        let readStream = null;

        for(var key in game_file){
            var fileKey = game_file[key];
            console.log(fileKey.video_location);

            const downloadParams = {
                Key: fileKey.video_location,
                Bucket: bucketName
            };
            console.log(downloadParams);

            readStream = s3.getObject(downloadParams).createReadStream();
        }
        
        
        // res.json(readStream);
        // readStream.pipe(res);
    },
}

module.exports = {video}