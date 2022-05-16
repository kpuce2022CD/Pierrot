import Layout from "../../Layout/Layout";
import "./Introduction.css";
import { Link, useNavigate } from "react-router-dom";

const Introduction = () => {    
    const navigate = useNavigate();
    return(
        <Layout>
            <div className="title1">
                <h1>Tennis</h1>
                <div className="card">
                    <div className="cardin">
                        <img src="./image/camera.png" />
                        <h2>단 한대의 카메라</h2>
                        <p>
                            단 한대의 카메라로 이용할 수 있는 서비스
                        </p>
                    </div>
                    <div className="cardin">
                        <img src="./image/camera.png" />
                        <h2>객관적인 데이터</h2>
                        <p>
                            객체를 트랙킹하여 얻은 객관적이고 정확한 데이터 제공
                        </p>
                    </div>
                    <div className="cardin">
                        <img src="./image/camera.png" />
                        <h2>웹 서비스를 통한 경기분석</h2>
                        <p>
                            경기 영상을 업로드만 하면 쉽게 이용할 수 있는 웹 서비스
                        </p>
                    </div>
                </div>
                <hr className="hh"/>
                <div className = "feature">
                    <div className="featuretext">
                        <h2>개인 분석 프로필 제공</h2>
                        <p>경기 영상을 계속적으로 올려 누적되는 자신의 데이터를 볼 수 있다.</p>
                    </div>
                    <div className="featureimg">
                        <img src = "./image/camera.png" width="500px"/>
                    </div>
                </div>
                <hr className="hh"/>
                <div className = "feature">
                    <div className="featureimg">
                        <div className="featureimg_left">
                        <img src = "./image/camera.png" width="500px"/>
                        </div>
                    </div>
                    <div className="featuretext">
                        <div className="featuretext_right">
                        <h2>경기 분석 데이터 제공</h2>
                        <p>촬영한 경기 영상을 분석하여 자신의 데이터를 제공 받고,
                            상대 선수와의 데이터를 비교할 수 있다.
                        </p>
                        </div>
                    </div>
                </div> 
            </div>
        </Layout>
);
}

export default Introduction;