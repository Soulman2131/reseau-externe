import React from "react";
import { useDispatch } from "react-redux";
import { emojisAdded } from "../features/postSlice";

function Emojis({ post }) {
  const dispatch = useDispatch();

  const reactionEmoji = {
    thumbsUp: "👌",
    wow: "😁",
    heart: "❤️",
    rocket: "🤖",
    coffee: "✌️",
  };

  const reactionButton = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="btn-emoji"
        onClick={() =>
          dispatch(emojisAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div> {reactionButton} </div>;
}

export default Emojis;
