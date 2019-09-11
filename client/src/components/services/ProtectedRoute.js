import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  authenticated,
  setAuthenticated,
  ...rest
}) => {
  const [communicating, setCommunicating] = useState(true);

  useEffect(() => {
    let subscribed = true;

    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${process.env.REACT_APP_ENDPOINT}/api/auth/authentication`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json", token: token }
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (subscribed) {
            setAuthenticated(true);
            setCommunicating(false);
          }
        })
        .catch(error => {
          console.error(`ERROR: ${error}`);
          if (subscribed) {
            setAuthenticated(false);
            setCommunicating(false);
          }
        });
    } else if (subscribed) {
      console.error("ERROR: no token in localStorage");
      setAuthenticated(false);
      setCommunicating(false);
    }

    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        communicating ? (
          <div>
            <p>loading..</p>
          </div>
        ) : authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
};

export default ProtectedRoute;
