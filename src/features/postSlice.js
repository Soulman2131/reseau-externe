import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

//
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const fetchAddPost = createAsyncThunk(
  "posts/fetchAddPost",
  async (postId) => {
    const response = await axios.post(POSTS_URL, postId);
    return response.data;
  }
);

// EDIT POST (try/catch)
export const fetchUpdatePost = createAsyncThunk(
  "posts/fetchUpdatePost",
  async (postId) => {
    const { id } = postId;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, postId);
      return response.data;
    } catch (error) {
      // return error.message;
      return postId; //testing redux
    }
  }
);

// DELETE (try/catch)
export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async (postId) => {
    const { id } = postId;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      if (response?.status === 200) return postId;
      return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, { payload }) {
        state.posts.push(payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    emojisAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const ifPostExists = state.posts.find((post) => post.id === postId);
      if (ifPostExists) {
        ifPostExists.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add date && reactions
        let min = 1;
        const addDateandReactions = action.payload.map((post) => {
          post.date = sub(new Date(), { minute: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(addDateandReactions);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAddPost.fulfilled, (state, action) => {
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        // End fix for fake API post IDs

        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      })
      .addCase(fetchUpdatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Impossible de modifier le post");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(fetchDeletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Impossible de supprimer le post");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

//
export const selectedAllPosts = (state) => state.posts.posts;

// ***
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
// ***

export const selectedAllStatus = (state) => state.posts.status;
export const selectedAllError = (state) => state.posts.error;

export const { postAdded, emojisAdded } = postSlice.actions;
export default postSlice.reducer;
