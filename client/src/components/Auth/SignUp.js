import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import SignUpForm from "./SignUpForm";

export const SignUp = ({ history }) => {
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
          .then(res => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("userID", res.userID);
            history.push(`/authenticated/profile/${res.userID}`);
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

  return (
    <SignUpForm
      signingUp={signingUp}
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      signUpError={signUpError}
    />
  );
};

export default withRouter(SignUp);
