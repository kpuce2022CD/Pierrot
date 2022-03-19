import React, { useState } from "react";
import "./VideoUpload.css";
import Layout from "../../Layout/Layout";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해
import axios from 'axios';

function VideoUpload() {

  const isVide = (video) => {
    const ext = video.name.split(".").pop();
    if (ext !== "mp4") {
      alert("영상만 업로드 가능합니다.");
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
    // {video-name: 'ㅇ', video-date: '2022-03-01', video: FileList}
    console.log(data.video);
    const formData = new FormData();
    formData.append('file', video);

    return axios.post("http://localhost:3001/api/upload",formData, { withCredentials: true }).then(res=>{
      alert('성공');
    }).catch(err=>{
      alert("실패");
    })
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
              {...register("video_name", { required: true })}
            />
            <label>Name</label>
          </div>
          <div className="date-area">
            <input
              type="date"
              autoComplete="off"
              required
              {...register("video_date", { required: true })}
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
  );
}
export default VideoUpload;