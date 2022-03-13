import Footer from "../../Layout/Footer";
import Header from "../../Layout/Header";
import Layout from "../../Layout/Layout";
import "./Guide.css";

const Guide = () => {
  return (
    <Layout>
      <div className="guide">
        {/* <h1>첫번째</h1> */}
        <li>회원가입하기</li>
        <li>로그인하기</li>
        <li>회원가입하기</li>
        <li>회원가입하기</li>
      </div>
    </Layout>
  );
};

export default Guide;
