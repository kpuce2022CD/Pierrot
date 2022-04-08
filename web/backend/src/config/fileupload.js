const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// const moment = require("moment");

const ACCESS_KEY = "AKIAYXOGVMBMJU4G7WWH";
const SECRET_ACCESS_KEY = "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";
const REGION = "ap-northeast-2";
const S3_BUCKET = "tukorea-tennis-video-file-upload";

const s3 = new aws.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
});

const storage = multerS3({
  s3: s3,
  bucket: S3_BUCKET,
  acl: "public-read", // 업로드 된 데이터를 URL로 읽을 때 설정하는 값입니다. 업로드만 한다면 필요없습니다.
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname }); // 파일 메타정보를 저장합니다.
  },
  key: function (req, file, cb) {
    cb(null, file.originalname); // key... 저장될 파일명과 같이 해봅니다.
  },
});

const upload = multer({ storage: storage }).single("file");

module.exports = upload;
