import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "../features/postSlice";
import { Link, useParams } from "react-router-dom";
import AuthorPost from "./AuthorPost";
import TimeAgo from "./TimeAgo";
import Emojis from "./Emojis";

function SinglePost() {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h3>La page est introuvable</h3>
      </section>
    );
  }

  return (
    <>
      <article>
        <h3> {post.title} </h3>
        <p> {post.body} </p>
        <div className="posts-infos">
          <Link to={`/post/edit/${post.id}`} className="a-link">
            Editer le post
          </Link>
          <AuthorPost userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </div>
        <Emojis post={post} />
      </article>
    </>
  );
}

export default SinglePost;
