import React from "react";
import AddPost from "./components/AddPost";
import Posts from "./components/Posts";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Header/Layout";
import SinglePost from "./components/SinglePost";
import EditPost from "./components/EditDelete/EditPost";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Posts />} />

          <Route path="post">
            <Route index element={<AddPost />} />
            <Route path=":postId" element={<SinglePost />} />
            <Route path="edit/:postId" element={<EditPost />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
