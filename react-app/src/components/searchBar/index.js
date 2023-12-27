import React, { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import * as projectStore from "../../store/projects";
import "./index.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const user = useSelector((state) => state.session.user);
  const joinRequest = useSelector(
    (state) => state.projects?.joinRequests?.join_requests || []
  );
  const handleJoinRequest = async (project_id) => {
    await dispatch(projectStore.requestToJoinProject(project_id));
    await dispatch(projectStore.fetchJoinRequests(user?.id));
  };
  const handlePostSearch = (value) => {
    setSearch(value);
    if (value.trim() === "") {
      // If the search input is empty, show an empty search result
      setSearchResults([]);
    } else {
      setSearchResults(
        posts.filter((post) => {
          return (
            (post.title.toLowerCase().includes(value.toLowerCase()) &&
              post.status === "Published") ||
            (post.body.toLowerCase().includes(value.toLowerCase()) &&
              post.status === "Published") ||
            (post.project_type.toLowerCase().includes(value.toLowerCase()) &&
              post.status === "Published")
          );
        })
      );
    }
    console.log(searchResults);
  };
  return (
    <div className="search-div">
      <input
        value={search}
        onChange={(e) => handlePostSearch(e.target.value)}
        className="search-bar"
        placeholder="Search Project Posts..."
      />
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          {searchResults.map((post) => (
            <div key={post.id} className="search-result">
              <div className="search-result-divider"></div>
              <h3>{post.title}</h3>
              <div className="search-result-info">
              <p>{post.body}</p>
              {user && user.id !== post.user_id && (
                      <>
                        {joinRequest.some(
                          (request) => request.project_id === post.project_id
                        ) ? (
                          <button className="sent-req-button" disabled>
                            Request Sent
                          </button>
                        ) : (
                          <button
                            className="search-req-button"
                            onClick={() => handleJoinRequest(post.project_id)}
                          >
                            Request
                          </button>
                        )}
                      </>
                    )}
                    </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
