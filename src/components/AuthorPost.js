import React from "react";
import { useSelector } from "react-redux";
import { selectedAllUsers } from "../features/userSlice";

function AuthorPost({ userId }) {
  const users = useSelector(selectedAllUsers);
  const author = users.find((user) => user.id === userId);

  return <span> par {author ? author.name : "Auteur inconnu"} </span>;
}

export default AuthorPost;
