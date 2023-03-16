import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2000/signup", {
        name,
        email,
        company,
        password,
        confirmPass,
      })
      .then((res) => {
        if (res.data.message) {
          toast("User Created Successfully!");
          navigate("/");
        } else {
          toast("User Already Exists");
          navigate("/signup");
        }
      });
  };
  return (
    <div className="right">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
        <div className="inputs">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="abc@xy.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Confirm password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export { Signup };
