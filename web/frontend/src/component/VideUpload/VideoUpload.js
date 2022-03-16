import React, { useState } from "react";
import "./VideoUpload.css";
import AWS from "aws-sdk";
import Layout from "../../Layout/Layout";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해

function VideoUpload() {
  // const [Progress , setProgress] = useState('')
  // const [SelectedFile, setSelectedFile] = useState(null);
  // const [ShowAlert, setShowAlert] = useState(false);

  // const ACCESS_KEY = 'AKIAYXOGVMBMLIUBZKXF';
  // const SECRET_ACCESS_KEY = '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';
  // const REGION = "ap-northeast-2";
  // const S3_BUCKET = 'tukorea-tennis-video-file-upload';

  // AWS.config.update({
  //     accessKeyId: ACCESS_KEY,
  //     secretAccessKey: SECRET_ACCESS_KEY
  // });

  // const myBucket = new AWS.S3({
  //     params: { Bucket: S3_BUCKET},
  //     region: REGION,
  // });

  // const handleFileInput = (e) => {
  //     const file = e.target.files[0];
  //     const fileExt = file.name.split('.').pop();
  //     if(file.type !== 'video/mp4' || fileExt !=='mp4'){
  //         alert('mp4 파일만 Upload 가능합니다.');
  //         return;
  //     }
  //     setProgress(0);
  //     setSelectedFile(e.target.files[0]);
  //     }

  // const uploadFile = (file) => {
  //     const params = {
  //         ACL: 'public-read',
  //         Body: file,
  //         Bucket: S3_BUCKET,
  //         Key: "upload/" + file.name
  //     };

  //     myBucket.putObject(params)
  //         .on('httpUploadProgress', (evt) => {
  //         setProgress(Math.round((evt.loaded / evt.total) * 100))
  //         setShowAlert(true);
  //         setTimeout(() => {
  //             setShowAlert(false);
  //             setSelectedFile(null);
  //         }, 3000)
  //         })
  //         .send((err) => {
  //         if (err) console.log(err)
  //         })
  //     }

  const isVide = (video) => {
    const ext = video.name.split(".").pop();
    if (ext !== "mp4") {
      alert("no");
      return false;
    } else return true;
  };

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();

  const onSubmit = (data) => {
    const video = data.video[0];
    if (!isVide(video)) return false;

    console.log(data);
    console.log(data.video);
  };

  const onError = (error) => {
    console.log(error);
  };
  return (
    <Layout>
      <div className="video-upload-area">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="name-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("video-name", { required: true })}
            />
            <label>Name</label>
          </div>
          <div className="date-area">
            <input
              type="date"
              autoComplete="off"
              required
              {...register("video-date", { required: true })}
            />
            <label>Date</label>
          </div>
          <div className="video-area">
            <input
              type="file"
              autoComplete="off"
              required
              {...register("video", { required: true })}
            />
            <label>Video</label>
          </div>
          <div className="video-submit-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </Layout>
    // <div className='App'>
    // <div className="App-header">
    //     <Row>
    //         <Col><h1>File Upload</h1></Col>
    //     </Row>
    //     </div>
    //     <div className="App-body">
    //     <Row>
    //         <Col>
    //         { ShowAlert?
    //             <Alert color="primary">업로드 진행률 : {Progress}%</Alert>
    //             :
    //             <Alert color="primary">파일을 선택해 주세요.</Alert>
    //         }
    //         </Col>
    //     </Row>
    //     <Row>
    //         <Col>
    //         <Input color="primary" type="file" onChange={handleFileInput}/>
    //         {SelectedFile?(
    //             <Button color="primary" onClick={() => uploadFile(SelectedFile)}> Upload to S3</Button>
    //         ) : null }
    //         </Col>
    //     </Row>
    //     </div>
    // </div>
  );
}
export default VideoUpload;
