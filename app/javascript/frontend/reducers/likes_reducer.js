import { combineReducers } from "redux";
import postLikesReducer from "./post_likes_reducer";
import commentLikesReducer from "./comment_likes_reducer";

const likesReducer = combineReducers({
  posts: postLikesReducer,
  comments: commentLikesReducer,
});

export default likesReducer;
