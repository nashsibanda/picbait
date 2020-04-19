import { combineReducers } from "redux";
import postLoadingReducer from "./loading/post_loading_reducer";
import userLoadingReducer from "./loading/user_loading_reducer";
import sessionLoadingReducer from "./loading/session_loading_reducer";
import commentLoadingReducer from "./loading/comment_loading_reducer";
import likeLoadingReducer from "./loading/like_loading_reducer";
import followLoadingReducer from "./loading/follow_loading_reducer";
import postPageLoadingReducer from "./loading/post_page_loading_reducer";
import usersAutocompleteLoadingReducer from "./loading/users_autocomplete_loading_reducer";

const loadingReducer = combineReducers({
  posts: postLoadingReducer,
  users: userLoadingReducer,
  session: sessionLoadingReducer,
  comments: commentLoadingReducer,
  likes: likeLoadingReducer,
  follows: followLoadingReducer,
  postPage: postPageLoadingReducer,
  usersAutocomplete: usersAutocompleteLoadingReducer,
});

export default loadingReducer;
