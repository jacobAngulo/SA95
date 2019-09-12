import React from "react";
import { createBrowserHistory } from "history";
import { TextField, Hourglass } from "react95";
import {
  AuthInputAreaContainer,
  AuthInputAreaLabel,
  LoadingContainer
} from "../styles";

export const InputArea = ({ value, setValue, type, placeholder, name }) => {
  return (
    <AuthInputAreaContainer>
      <AuthInputAreaLabel>{name}</AuthInputAreaLabel>
      <TextField
        value={value}
        onChange={e => setValue(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </AuthInputAreaContainer>
  );
};

export const Loading = ({ label }) => (
  <LoadingContainer>
    {label}
    <Hourglass size={32} />
  </LoadingContainer>
);
