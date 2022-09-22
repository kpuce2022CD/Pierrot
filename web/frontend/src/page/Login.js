import "Styles/LoginPage.css";
import useInput from "Hooks/useInput";
import { ICON } from "Constants/icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const email = useInput("");
  const password = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email.value, password.value);
    navigate("/game/list");
  };
  return (
    <div className="loginPage">
      <div className="login-title">
        <a href="/">
          <img src={ICON.LOGO} />
          <h1>A.Te.Co</h1>
        </a>
      </div>
      <div className="login-card">
        <div className="login-msg">
          <p>Welcome back!</p>
          <p>Sign in to your accunt</p>
        </div>
        <form className="login-form" onSubmit={onSubmit}>
          <input type={"email"} {...email} placeholder={"Email"} required />
          <input
            type={"password"}
            {...password}
            placeholder={"Password"}
            required
          />
          <input type={"submit"} value={"Login"} />
        </form>
        <div className="login-card-footer">
          <p>
            Don`t have an account?<a href="/signup">Sign up</a>
          </p>
          <a href="/">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
