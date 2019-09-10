import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  authenticated,
  setAuthenticated,
  validateToken,
  ...rest
}) => {
  const [communicating, setCommunicating] = useState(true);

  useEffect(() => {
    let subscribed = true;

    validateToken(localStorage.getItem("token"))
      .then(res => {
        // console.log(res);
        if (subscribed) {
          setCommunicating(false);
        }
      })
      .catch(error => {
        console.error(`ERROR: ${error}`);
        if (subscribed) {
          setCommunicating(false);
        }
      });

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
