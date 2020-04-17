import { combineReducers } from "redux";
import commentPostingReducer from "./posting/comment_posting_reducer";
import postPostingReducer from "./posting/post_posting_reducer";
import userPostingReducer from "./posting/user_posting_reducer";

const postingReducer = combineReducers({
  comments: commentPostingReducer,
  posts: postPostingReducer,
  users: userPostingReducer,
});

export default postingReducer;
