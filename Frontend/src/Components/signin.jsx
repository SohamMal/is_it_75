import { useNavigate } from "react-router-dom";
import logo from "../images/isit75.png";
import React, { useState } from "react";

export function Signin() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [activeButton, setActiveButton] = useState("signin"); // Track the active button

  const handleSignIn = async () => {
    const responseBody = {
      username,
      password,
    };
    try {
      const response = await fetch("https://is-it-75.onrender.com/signin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(responseBody),
      });
      const value = await response.json();
      if (value) {
        setResponseMsg(value.msg);
        if (value.token) {
          localStorage.setItem("token", value.token);
          navigate("/home");
        }
      }
    } catch (e) {
      setResponseMsg("Server Error");
    }
  };

  const handleSignUp = async () => {
    const responseBody = {
      username,
      password,
    };
    try {
      const response = await fetch("https://is-it-75.onrender.com/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(responseBody),
      });
      const value = await response.json();
      if (value) {
        setResponseMsg(value.msg);
        if (value.token) {
          localStorage.setItem("token", value.token);
          navigate("/home");
        }
      }
    } catch (e) {
      setResponseMsg("Server Error");
    }
  };

  const handleEmailChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleForm = (isSignIn) => {
    setIsSignIn(isSignIn);
    setActiveButton(isSignIn ? "signin" : "signup"); 
  };

  return (
    <div className="outer-container">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <div className="options-container">
          <button
            className={activeButton === "signin" ? "active" : ""}
            onClick={() => toggleForm(true)}
          >
            Sign In
          </button>
          <button
            className={activeButton === "signup" ? "active" : ""}
            onClick={() => toggleForm(false)}
          >
            Sign Up
          </button>
        </div>
        <div className="form-container">
          {isSignIn ? (
            <div>
              <h3>Sign In</h3>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={handleEmailChange}
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={handlePasswordChange}
              />
              <button type="submit" onClick={handleSignIn}>
                Sign in
              </button>
              {responseMsg && <p>{responseMsg}</p>}
            </div>
          ) : (
            <div>
              <h3>Sign Up</h3>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="submit"
                onClick={() => {
                  handleSignUp();
                }}
              >
                Sign Up
              </button>
              {responseMsg && <p>{responseMsg}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

