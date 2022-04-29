import { LOADING_LIKES, LOADED_LIKES } from "../../actions/fetching_actions";

const likeLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOADING_LIKES:
      return true;
    case LOADED_LIKES:
      return false;
    default:
      return state;
  }
};

export default likeLoadingReducer;
