import { combineReducers } from "redux";
import postLikesReducer from "./post_likes_reducer";

const likesReducer = combineReducers({
  posts: postLikesReducer,
});

export default likesReducer;
