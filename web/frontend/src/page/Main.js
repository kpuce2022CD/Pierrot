import "Styles/MainPage.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="mainPage">
      <div className="header">
        <div className="header-title">A.Te.Co</div>
        <div className="header-menus">
          <ul>
            <li onClick={() => navigate("/login")}>Log in</li>
            <li onClick={() => navigate("/signup")}>Sign up</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Main;
