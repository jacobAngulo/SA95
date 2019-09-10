import React, { useState, useRef, useEffect } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/services/ProtectedRoute";
import SearchInput from "./components/SearchInput";
import { List, ListItem, Divider, Button, Toolbar } from "react95";
import { StyledAppBar, BoldButton95 } from "./styles";

const DropdownMenu = ({ openToggler, handleLogOut }) => {
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = event => {
    if (!node.current.contains(event.target)) {
      openToggler(false);
    }
  };

  return (
    <div ref={node}>
      <List
        horizontalAlign="right"
        verticalAlign="bottom"
        onClick={() => openToggler(false)}
      >
        <Link to={`/profile/${localStorage.getItem("userID")}`}>
          <ListItem>
            <span role="img" aria-label="extraterrestrial alien">
              👽
            </span>
            profile
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem>
            <span role="img" aria-label="earth globe americas">
              🌎
            </span>
            home
          </ListItem>
        </Link>
        <Divider />
        <Button onClick={handleLogOut}>
          <span role="img" aria-label="back with leftwards arrow above">
            🔙
          </span>
          Logout
        </Button>
      </List>
    </div>
  );
};

const App = ({ history }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [open, setOpen] = useState(false);
  const validateToken = token => {
    // return axios
    return (
      fetch(`${process.env.REACT_APP_ENDPOINT}/api/users/`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token
        })
      })
        .then(res => res.json())

        // .post(`${process.env.REACT_APP_ENDPOINT}/api/auth/authentication`, {
        //   token: token
        // })
        .then(res => {
          // console.log(res);
          setAuthenticated(true);
          return res;
        })
        .catch(error => {
          console.log("ERROR: ", error);
          setAuthenticated(false);
          return error;
        })
    );
  };

  const handleLogOut = event => {
    event.preventDefault();
    localStorage.clear();
    setAuthenticated(false);
    history.push("/auth");
  };
  return (
    <div>
      {authenticated && (
        <StyledAppBar>
          <Toolbar style={{ justifyContent: "flex-end" }}>
            {open && (
              <DropdownMenu openToggler={setOpen} handleLogOut={handleLogOut} />
            )}
            <BoldButton95 onClick={() => setOpen(!open)} active={open}>
              <span role="img" aria-label="water wave">
                🌊
              </span>
              Start
            </BoldButton95>
            <SearchInput />
          </Toolbar>
        </StyledAppBar>
      )}
      <Route
        path="/auth"
        render={props => <Auth {...props} validateToken={validateToken} />}
      />
      <ProtectedRoute
        exact
        path="/"
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        validateToken={validateToken}
        component={Home}
      />
      <ProtectedRoute
        path="/profile/:id"
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        validateToken={validateToken}
        component={Profile}
      />
    </div>
  );
};

export default withRouter(App);
