import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import LoggedInView from "./LoggedInView";
import { withRouter } from "react-router-dom";

const App = ({ location }) => {
  console.log(location);

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <Switch>
      <Route exact path="/" render={props => <Auth {...props} />} />
      <Route path="/authenticated/" component={LoggedInView} />
    </Switch>
  );
};

export default withRouter(App);
