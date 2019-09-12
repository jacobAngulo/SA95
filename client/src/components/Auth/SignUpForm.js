import React from "react";
import { Button } from "react95";
import { ErrorDisplay } from "../../styles";
import { InputArea, Loading } from "../../utils";

function SignUpForm({
  signingUp,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  signUpError
}) {
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
}

export default SignUpForm;
