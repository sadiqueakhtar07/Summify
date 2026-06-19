import React, { useContext, useState } from 'react';
import './Sign.css';
import { MyContext } from '../contextAPI/contextAPI';
import { useNavigate } from 'react-router-dom';

const Sign = () => {
  const navigate = useNavigate();
  const { setShowSignup, setToken, setUserRole } = useContext(MyContext);

  const [currState, setCurrState] = useState("Login");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, [e.target.name]: e.target.value 
    });
    setError("");
  };

  const handleSign = async (e) => {
    e.preventDefault();
    setError("");

    const url = currState === "Login"
      ? "http://localhost:3000/api/auth/login"
      : "http://localhost:3000/api/auth/signup";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Wrong email or password");
        return;
      }

      if (data.token) {
        setToken(data.token);
        setUserRole(data.role || "user");
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role || "user");

        setShowSignup(false);

        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Wrong email or password");
      }

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className='sign-popup'>
      <form onSubmit={handleSign} className='sign-container'>

        <div className="sign-title">
          <h2>{currState}</h2>
          <i onClick={() => setShowSignup(false)} className="fa-solid fa-xmark"></i>
        </div>

        <div className="sign-input">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter Email Id"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
        </div>

        {error && 
        <p className="sign-error">{error}</p>
        }

        <button type='submit'>
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <p>
          {currState === "Login" ? (
            <>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here!</span></>
          ) : (
            <>Already have an account? <span onClick={() => setCurrState("Login")}>Login here!</span></>
          )}
        </p>

      </form>
    </div>
  );
};

export default Sign;