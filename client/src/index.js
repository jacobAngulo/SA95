import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { themes, reset } from "react95";

const ResetStyles = createGlobalStyle`
  ${reset}
`;

ReactDOM.render(
  <Router forceRefresh={true}>
    <ResetStyles />
    <ThemeProvider theme={themes.water}>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById("root")
);
