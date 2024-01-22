import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { fetchUsers } from "./features/userSlice";
import { fetchPosts } from "./features/postSlice";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
