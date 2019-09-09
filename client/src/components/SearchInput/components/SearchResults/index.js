import React, { useRef, useEffect } from "react";
import { List, ListItem } from "react95";
import { Link } from "react-router-dom";

function SearchResults({
  searchResults,
  setSearchInputActiveStatus,
  setSearchField
}) {
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = event => {
    if (!node.current.contains(event.target)) {
      setSearchInputActiveStatus(false);
    }
  };

  return (
    <div ref={node}>
      <List fullWidth>
        {searchResults.map(user => (
          <Link
            key={user.id}
            onClick={() => {
              setSearchInputActiveStatus(false);
              setSearchField("");
            }}
            to={`/profile/${user.id}`}
          >
            <ListItem>{user.full_name}</ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}

export default SearchResults;
