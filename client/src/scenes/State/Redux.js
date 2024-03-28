import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      // updated posts
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
          post = action.payload.post;
        }
        state.posts = updatedPosts;
      });
    },
  },
});

// Action Creator
const { setMode, setLogIn, setLogOut, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
/**
 *
 * itha thaniya store la manage pannuvom
 * but inga nama direct ah main.jsx la manage panniduvom
 */
