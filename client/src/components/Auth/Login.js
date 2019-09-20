import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { withRouter } from "react-router-dom";

export const Login = ({ history }) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    console.log("logging in");
    event.preventDefault();
    if (email && password) {
      setLoggingIn(true);
      fetch(`${process.env.REACT_APP_ENDPOINT}/api/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          // Origin: process.env.REACT_APP_ENDPOINT,
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then(res => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("userID", res.userID);
          setLoggingIn(false);
          return history.push("/authenticated/");
        })
        .catch(error => {
          setLoggingIn(false);
          setLoginError(error.toString());
          console.error(`ERROR: ${error}`);
        });
    } else {
      setLoginError("must fill out required fields to log in");
    }
  };

  return (
    <LoginForm
      loggingIn={loggingIn}
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      loginError={loginError}
    />
  );
};

export default withRouter(Login);
