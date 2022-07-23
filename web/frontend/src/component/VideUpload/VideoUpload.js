import React, { useRef } from "react";
import "./VideoUpload.css";
import Layout from "../../Layout/Layout";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해
import { uploadVideo } from "../../apis";

function VideoUpload() {
  const ref = useRef();

  const isVide = (video) => {
    const ext = video.name.split(".").pop();
    if (ext !== "mp4") {
      alert(".mp4 파일 영상만 업로드 가능합니다.");
      return false;
    } else {
      return true;
    }
  };

  const isScore = (text = "") => {
    const score = text.replace(/ /g, "");
    if (/^\d+:\d+$/.test(score)) {
      return true;
    } else {
      alert("점수 형식을 맞춰주세요. 내점수 : 상대 점수");
      return false;
    }
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const video = data.video[0];
    const text = data.video_score;
    console.log(text, data);
    if (!isVide(video) || !isScore(text)) {
      return false;
    }
    ref.current.style.display = "block";

    const frm = new FormData();
    frm.append("video", video);
    frm.append("date", data.video_date);
    frm.append("opponent", data.video_opponent);
    frm.append("winder", data.video_winder);

    upload(data.video_winer, data.video_opponent, data.video_date, video);
  };

  const onError = (error) => {
    alert("error");
  };

  const upload = async (winer, opponent, date, video) => {
    const res = await uploadVideo(winer, opponent, date, video);
    if (res.success) {
      alert("성공");
    } else {
      alert("실패");
    }
    ref.current.style.display = "none";
  };
  return (
    <Layout>
      <div className="loader" ref={ref}></div>
      <div className="video-upload-area">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="score-area">
            <input
              type="text"
              autoComplete="off"
              placeholder="내 점수 : 상대 점수"
              required
              {...register("video_score", { required: true })}
            />
            <label>점수</label>
          </div>
          <div className="opponent-area">
            <input
              type="text"
              autoComplete="off"
              required
              {...register("video_opponent", { required: true })}
            />
            <label>상대선수</label>
          </div>
          <div className="date-area">
            <input
              type="date"
              autoComplete="off"
              required
              {...register("video_date", { required: true })}
            />
          </div>
          <div className="video-area">
            <input
              id="video"
              type="file"
              accept=".mp4"
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
