import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
	  console.log();
	  
      console.log("Submitting data:", data); // Log data before sending
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
	  
      navigate("/Main"); // Use navigate instead of window.location
    } catch (error) {

      console.error("Error during login:", error);
	   // Log the error
      if (error.response) {

        setError(error.response.data.message || "An error occurred during login.");
      } 
	  else {
        setError("Unable to connect to the server. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;