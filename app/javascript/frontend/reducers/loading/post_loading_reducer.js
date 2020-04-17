import { LOADING_POSTS, LOADED_POSTS } from "../../actions/fetching_actions";

const postLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOADING_POSTS:
      return true;
    case LOADED_POSTS:
      return false;
    default:
      return state;
  }
};

export default postLoadingReducer;
