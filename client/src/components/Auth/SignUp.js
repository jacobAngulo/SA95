import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button } from "react95";
import { ErrorDisplay } from "../../styles";
import { InputArea, Loading } from "../../utils";

export const SignUp = ({ validateToken, history }) => {
  const [signingUp, setSigningUp] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        setSigningUp(true);
        axios
          .post(`${process.env.REACT_APP_ENDPOINT}/api/auth/registration`, {
            email,
            password
          })
          .then(res => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userID", res.data.userID);
            validateToken(res.data.token).then(() =>
              history.push(`/profile/${res.data.userID}`)
            );
            setSigningUp(false);
          })
          .catch(error => {
            setSigningUp(false);
            setSignUpError(error.toString());
            console.log(`ERROR: ${error}`);
          });
      } else {
        setSignUpError("passwords do not match");
      }
    } else {
      setSignUpError("must fill out required fields to sign up");
    }
  };

  return signingUp ? (
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
      <InputArea
        value={confirmPassword}
        setValue={setConfirmPassword}
        type="password"
        name="confirm password: "
        placeholder="confirm password"
      />

      {signUpError && (
        <ErrorDisplay>
          <p>{signUpError}</p>
        </ErrorDisplay>
      )}
      <Button fullWidth type="submit">
        Sign Up
      </Button>
    </form>
  );
};

export default withRouter(SignUp);
