import React, { useState, useRef, useEffect } from "react";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { StyledAppBar, BoldButton95 } from "./styles";
import { List, ListItem, Divider, Button, Toolbar } from "react95";
import { Link, Route, withRouter } from "react-router-dom";
import SearchInput from "./components/SearchInput";

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
        <Link to={`/authenticated/profile/${localStorage.getItem("userID")}`}>
          <ListItem>
            <span role="img" aria-label="extraterrestrial alien">
              👽
            </span>
            profile
          </ListItem>
        </Link>
        <Link to="/authenticated/">
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

const LoggedInView = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    return () => {
      setAuthenticated(false);
    };
  }, []);

  const handleLogOut = event => {
    event.preventDefault();
    localStorage.clear();
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

      <Route exact path="/authenticated/" component={Home} />
      <Route path="/authenticated/profile/:id" component={Profile} />
    </div>
  );
};

export default withRouter(LoggedInView);
