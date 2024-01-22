import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedAllUsers } from "../../features/userSlice";
import {
  fetchDeletePost,
  fetchUpdatePost,
  selectPostById,
} from "../../features/postSlice";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector(selectedAllUsers);
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const [title, setTitle] = useState(post?.title); //On met les ? puisk edit
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [addStatus, setAddStatus] = useState("idle");

  if (!post) {
    return (
      <section>
        <h3>La page est introuvable</h3>
      </section>
    );
  }

  //   I CAN SAVE ENREGISTRER
  const canSave =
    [title, content, userId].every(Boolean) && addStatus === "idle";

  //
  const handleAddPost = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddStatus("pending");
        dispatch(
          fetchUpdatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error("Impossible d'éditer le post", error);
      } finally {
        setAddStatus("idle");
      }
    }
  };

  // DELETE
  const handleDelete = () => {
    try {
      setAddStatus("pending");
      dispatch(
        fetchDeletePost({
          id: post.id,
        })
      ).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.error("Impossible de supprimer le post", error);
    } finally {
      setAddStatus("idle");
    }
  };

  //   SELECT FUNCTION
  const userOptions = users.map((user, index) => (
    <option key={index} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <>
      <div className="addpost-container">
        <h2>Modifier ou supprimer un post </h2>
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
            // Attention on a Number ici 😍
            onChange={(e) => setUserId(Number(e.target.value))}
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
          <input
            type="button"
            className="delete-btn"
            onClick={handleDelete}
            value="Supprimer le post"
          />
        </form>
      </div>
    </>
  );
}

export default EditPost;
