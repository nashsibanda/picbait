import {
  LOADING_POST_PAGE,
  LOADED_POST_PAGE,
} from "../../actions/fetching_actions";

const postPageLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOADING_POST_PAGE:
      return true;
    case LOADED_POST_PAGE:
      return false;
    default:
      return state;
  }
};

export default postPageLoadingReducer;
