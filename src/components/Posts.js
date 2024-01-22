import React from "react";
import { useSelector } from "react-redux";
import {
  selectedAllError,
  selectedAllPosts,
  selectedAllStatus,
} from "../features/postSlice";
import AuthorPost from "./AuthorPost";
import TimeAgo from "./TimeAgo";
import Emojis from "./Emojis";
import { Link } from "react-router-dom";

function Posts() {
  const posts = useSelector(selectedAllPosts);
  const postStatus = useSelector(selectedAllStatus);
  const postError = useSelector(selectedAllError);

  //
  let content;
  if (postStatus === "loading") {
    content = <p> Loading... </p>;
  } else if (postStatus === "succeeded") {
    content = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((post, index) => (
        <article key={index}>
          <div>
            <h3> {post.title} </h3>
            {/* On a remplacé content par body */}
            <p> {post.body.substring(0, 100)}... </p>
          </div>
          <div className="posts-infos">
            <Link to={`/post/${post.id}`} className="a-link">
              Cliquer pour voir le post
            </Link>
            <AuthorPost userId={post.userId} />
            <TimeAgo timestamp={post.date} />
          </div>
          <Emojis post={post} />
        </article>
      ));
  } else if (postStatus === "failed") {
    content = <p> {postError} </p>;
  }

  return (
    <div className="posts-container">
      <h2>La liste des posts</h2>

      {content}
    </div>
  );
}

export default Posts;
