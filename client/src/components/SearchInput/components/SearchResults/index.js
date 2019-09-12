import React, { useRef, useEffect } from "react";
import { List, ListItem } from "react95";
import { Link } from "react-router-dom";

function SearchResults({
  searchResults,
  setSearchInputActiveStatus,
  setSearchField
}) {
  const searchResultsNode = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", searchResultsClickListener);
    return () => {
      document.removeEventListener("mousedown", searchResultsClickListener);
    };
  }, []);

  const searchResultsClickListener = event => {
    if (!searchResultsNode.current.contains(event.target)) {
      setSearchInputActiveStatus(false);
    }
  };

  return (
    <div ref={searchResultsNode}>
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
