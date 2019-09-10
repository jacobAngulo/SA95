import React, { useState } from "react";
import { Button } from "react95";
import { ErrorDisplay } from "../../styles";
import { InputArea, Loading } from "../../utils";
import { withRouter } from "react-router-dom";

export const Login = ({ validateToken, history }) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (email && password) {
      setLoggingIn(true);
      fetch(`${process.env.REACT_APP_ENDPOINT}/api/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
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
          validateToken(res.token).then(() => history.push("/"));
          setLoggingIn(false);
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

  return loggingIn ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit}>
      <InputArea
        value={email}
        setValue={setEmail}
        type="email"
        name="email: "
        placeholder="email"
      />
      <InputArea
        value={password}
        setValue={setPassword}
        type="password"
        name="password: "
        placeholder="password"
      />
      {loginError && (
        <ErrorDisplay>
          <p>{loginError}</p>
        </ErrorDisplay>
      )}
      <Button fullWidth type="submit">
        Login
      </Button>
    </form>
  );
};

export default withRouter(Login);
