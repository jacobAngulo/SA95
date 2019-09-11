import React from "react";
import { Redirect } from "react-router-dom";
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

export const fetchWithAuth = (url, params) => {
  const token = localStorage.getItem("token");

  if (token) {
    return fetch(url, params)
      .then(res => res.json())
      .then(res => res)
      .catch(error => {
        console.error(`ERROR: ${error}`);
        return <Redirect to="/auth" />;
      });
  } else {
    console.error("ERROR: no token in local storage");
    return <Redirect to="/auth" />;
  }
};
