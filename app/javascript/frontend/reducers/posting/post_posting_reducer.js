import { POSTING_POSTS, POSTED_POSTS } from "../../actions/posting_actions";

const postPostingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case POSTING_POSTS:
      return true;
    case POSTED_POSTS:
      return false;
    default:
      return state;
  }
};

export default postPostingReducer;
