import React from "react";
import { Button } from "react95";
import { ErrorDisplay } from "../../styles";
import { InputArea, Loading } from "../../utils";

function LoginForm({
  loggingIn,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  loginError
}) {
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
}

export default LoginForm;
