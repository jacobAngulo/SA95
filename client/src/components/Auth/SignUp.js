import React, { useState } from "react";
import { withRouter } from "react-router-dom";
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
        fetch(`${process.env.REACT_APP_ENDPOINT}/api/auth/registration`, {
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
          // axios
          //   .post(`${process.env.REACT_APP_ENDPOINT}/api/auth/registration`, {
          //     email,
          //     password
          //   })
          .then(res => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("userID", res.userID);
            validateToken(res.token).then(() =>
              history.push(`/profile/${res.userID}`)
            );
            setSigningUp(false);
          })
          .catch(error => {
            setSigningUp(false);
            setSignUpError(error.toString());
            console.error(`ERROR: ${error}`);
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
