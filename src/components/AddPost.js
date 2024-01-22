import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddPost } from "../features/postSlice";
import { selectedAllUsers } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addStatus, setAddStatus] = useState("idle");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectedAllUsers);

  //   I CAN SAVE ENREGISTRER
  const canSave =
    [title, content, userId].every(Boolean) && addStatus === "idle";
  //
  const handleAddPost = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddStatus("pending");
        dispatch(fetchAddPost({ title, body: content, userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.error("Impossible d'enregistrer le post");
      } finally {
        setAddStatus("idle");
      }
    }
  };

  //   SELECT FUNCTION
  const userOptions = users.map((user, index) => (
    <option key={index} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div className="addpost-container">
      <h2>Ajouter un post </h2>
      <form action="#" onSubmit={handleAddPost}>
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/*  */}
        <label htmlFor="author">Auteur</label>
        <select
          name="author"
          id="author"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value=""></option>
          {userOptions}
        </select>

        {/*  */}
        <label htmlFor="content">Message</label>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <input type="submit" value="Enregistrer" disabled={!canSave} />
      </form>
    </div>
  );
}

export default AddPost;
