import React, { useEffect } from "react";
import * as postStore from "../../store/posts";
import * as projectStore from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditPost from "../EditPost";
import { Link } from "react-router-dom/";
import "./index.css";
import { useParams } from "react-router-dom";
import DeletePost from "../DeletePost";
import ProjectBar from "../ProjectBar";
export default function ManagePosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.posts || []);
  const test = useSelector((state) => state);
  const user = useSelector((state) => state.session.user);
  const res = Array.isArray(posts)
    ? posts.filter((post) => post.status === "Published" && post.user_id === user.id)
    : [];
  const draftArray = Array.isArray(posts)
    ? posts.filter((post) => post.status === "Draft" && post.user_id === user.id)
    : [];
    console.log('this is the draft array', draftArray)
    console.log('this is the post array', res)
  const { post_id } = useParams();
  useEffect(() => {
    dispatch(postStore.getPostsThunk());
  }, [dispatch]); 
  if (!posts || posts.length === 0) {
    return <div>Loading...</div>; // Display a loading state until spots are fetched
  }
  return (
    <>
      <div className=" manage-wrapper">
        <div className="post-wrapper">
          {res?.length > 0 && (
            <>
            <h2 className="post-header">my Posts</h2>
              {res.map((post, i) => (
                <div className="post">
                  <div className="post-top">
                    <p className="title">{post.title}</p>
                    {user && user.id === post.user_id && (
                      <div className="modal-buttons">
                        
                          <OpenModalButton
                            className="modal-button"
                            buttonText="Edit Post"
                            modalComponent={<EditPost post_id={post.id} />}
                          ></OpenModalButton>
                        {/* <div className="side-bar"></div> */}
                        <OpenModalButton
                          className="modal-button"
                          buttonText="Delete Post"
                          modalComponent={<DeletePost post_id={post.id} />}
                        ></OpenModalButton>
                      </div>
                    )}
                  </div>
                  <p className="post-content">{post.body}</p>
                </div>
              ))}
                  <h2 className="draft-header">my Drafts</h2>
              {draftArray.map((post, i) => (
                <div className="post">
                  <div className="post-top">
                    <p className="title">{post.title}</p>
                    {user && user.id === post.user_id && (
                      <div className="modal-buttons">
                        
                          <OpenModalButton
                            className="modal-button"
                            buttonText="Edit Post"
                            modalComponent={<EditPost post_id={post.id} />}
                          ></OpenModalButton>
                        {/* <div className="side-bar"></div> */}
                        <OpenModalButton
                          className="modal-button"
                          id="delete-button"
                          buttonText="Delete Post"
                          modalComponent={<DeletePost post_id={post.id} />}
                        ></OpenModalButton>
                      </div>
                    )}
                  </div>
                  <p className="post-content">{post.body}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
