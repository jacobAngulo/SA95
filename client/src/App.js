import React from "react";
import { Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import LoggedInView from "./LoggedInView";
const App = () => {
  return (
    <div>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/authenticated/" component={LoggedInView} />
    </div>
  );
};

export default App;
