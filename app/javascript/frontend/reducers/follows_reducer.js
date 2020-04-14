import { combineReducers } from "redux";
import followersReducer from "./followers_reducer";
import followingReducer from "./following_reducer";

const followsReducer = combineReducers({
  followers: followersReducer,
  following: followingReducer,
});

export default followsReducer;
