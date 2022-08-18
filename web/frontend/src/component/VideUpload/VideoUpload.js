import React, { useState, useRef } from "react";
import "./VideoUpload.css";
import Layout from "../../Layout/Layout";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해
import axios, { Axios } from "axios";
import { uploadVideo } from "../../apis";

function VideoUpload() {
  const ref = useRef();

  const isVide = (video) => {
    const ext = video.name.split(".").pop();
    if (ext !== "mp4") {
      alert(".mp4 파일 영상만 업로드 가능합니다.");
      return false;
    } else return true;
  };

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();

  const onSubmit = (data) => {
    console.log("submit");
    const video = data.video[0];
    if (!isVide(video)) return false;
    // const loader = document.querySelector(".loader");
    // loader.style.display = "block";
    ref.current.style.display = "block";
    console.log(data);
    // {video-name: 'ㅇ', video-date: '2022-03-01', video: FileList}
    console.log(data.video);

    const frm = new FormData();
    frm.append("video", video);
    frm.append("date", data.video_date);
    frm.append("opponent", data.video_opponent);
    frm.append("winder", data.video_winder);
    for (let key of frm.entries()) {
      console.log(`${key}`);
    }
    console.log("puload 전", frm);
    upload(data.video_winer, data.video_opponent, data.video_date, video);
  };

  const onError = (error) => {
    console.log(error);
  };

  const upload = async (winer, opponent, date, video) => {
    const res = await uploadVideo(winer, opponent, date, video);
    if (res.success) {
      alert("성공");
    } else {
      alert("실패");
    }
    console.log("puload 후");
    ref.current.style.display = "none";
  };
  return (
    <Layout>
      <div className="loader" ref={ref}></div>
      <div className="video-upload-area">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="winer-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("video_winer", { required: true })}
            />
            <label>winer</label>
          </div>
          <div className="opponent-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("video_opponent", { required: true })}
            />
            <label>opponent</label>
          </div>
          {/* <div className="score-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("video_score", { required: true })}
            />
            <label>score</label>
          </div> */}
          <div className="date-area">
            <input
              type="date"
              autoComplete="off"
              required
              {...register("video_date", { required: true })}
            />
          </div>
          <div className="video-area">
            <span className="file-text"></span>

            <label htmlFor="video">업로드</label>
            <input
              id="video"
              type="file"
              required
              {...register("video", { required: true })}
            />
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
