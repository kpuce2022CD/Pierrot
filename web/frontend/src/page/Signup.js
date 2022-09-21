import "Styles/SignupPage.css";
import useInput from "Hooks/useInput";
import { ICON } from "Constants/icons";

const Signup = () => {
  const email = useInput("");
  const password = useInput("");
  const checkPw = useInput("");
  const name = useInput("");
  const team = useInput("");
  const weight = useInput("");
  const height = useInput("");
  const age = useInput("");
  const isAgree = useInput(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email.value, password.value);
  };
  return (
    <div className="signupPage">
      <div className="signup-title">
        <a href="/">
          <img src={ICON.LOGO} />
          <h1>A.Te.Co</h1>
        </a>
      </div>
      <div className="signup-card">
        <div className="signup-msg">
          <p>Create a A.Te.Co Account</p>
        </div>
        <form className="signup-form" onSubmit={onSubmit}>
          <input type={"email"} {...email} placeholder={"Email"} required />
          <input
            type={"password"}
            {...password}
            placeholder={"Password"}
            required
          />
          <input
            type={"password"}
            {...checkPw}
            placeholder={"Confirm your password"}
            required
          />
          <input type={"string"} {...name} placeholder={"Your name"} required />
          <input type={"string"} {...team} placeholder={"Team"} required />
          <input type={"number"} {...weight} placeholder={"Weight"} required />
          <input type={"number"} {...height} placeholder={"Height"} required />
          <input type={"number"} {...age} placeholder={"Age"} required />

          <input type={"submit"} value={"Login"} />
        </form>
        <div className="signup-card-footer">
          <p>
            Already have an account?<a href="/login"> Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
