import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setIsLoggedin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logging, setLogging] = useState(false);

 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast("Email/Password cannot be empty");
      setLogging(true);
      return;
    }

    axios
      .post("http://localhost:2000/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.message) {
          console.log("token", res.data.token);
          window.localStorage.setItem("data", res.data.token);
          window.localStorage.setItem("loggedIn", true);
          setIsLoggedin(true);
          toast("Successfully logged in");
          // setUser(res.data.user);
          navigate("/dashboard");
        } else {
          toast("Invalid Username/Password");
          setLogging(true);
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="right">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>
          Don't have an account? <Link to="/signup">Create Your Account</Link>
        </p>
        <div className="inputs">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {/* <div className="remember-me--forget-password">
          <p>forget password?</p>
        </div> */}
        <br />
        <button type="submit" disabled={logging}>
          {logging ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export { Login };
