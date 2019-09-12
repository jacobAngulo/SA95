import React, { useState, useRef, useEffect } from "react";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import { StyledAppBar, BoldButton95 } from "./styles";
import { List, ListItem, Divider, Button, Toolbar } from "react95";
import { Link, Route, withRouter } from "react-router-dom";
import SearchInput from "./components/SearchInput";

const LoggedInView = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  const dropdownNode = useRef();

  useEffect(() => {
    console.log(dropdownNode);
    document.addEventListener("mousedown", dropdownClickListener);
    return () => {
      document.removeEventListener("mousedown", dropdownClickListener);
    };
  }, []);

  useEffect(() => {
    return () => {
      setAuthenticated(false);
    };
  }, []);

  const dropdownClickListener = event => {
    if (!dropdownNode.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleLogOut = event => {
    event.preventDefault();
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      {authenticated && (
        <StyledAppBar>
          <Toolbar style={{ justifyContent: "flex-end" }}>
            <div ref={dropdownNode}>
              <BoldButton95 onClick={() => setOpen(!open)} active={open}>
                {open && (
                  <div>
                    <List
                      horizontalAlign="right"
                      verticalAlign="bottom"
                      onClick={() => setOpen(false)}
                    >
                      <Link
                        to={`/authenticated/profile/${localStorage.getItem(
                          "userID"
                        )}`}
                      >
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
                        <span
                          role="img"
                          aria-label="back with leftwards arrow above"
                        >
                          🔙
                        </span>
                        Logout
                      </Button>
                    </List>
                  </div>
                )}
                <span role="img" aria-label="water wave">
                  🌊
                </span>
                Start
              </BoldButton95>
            </div>
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
