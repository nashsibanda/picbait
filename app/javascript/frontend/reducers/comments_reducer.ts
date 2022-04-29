import { RECEIVE_POST } from "../actions/post_actions";
import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  CLEAR_COMMENT,
} from "../actions/comment_actions";

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENTS:
      const commentsOutput = {};
      action.comments.forEach(comment => {
        commentsOutput[comment.id] = comment;
      });
      return commentsOutput;
    case RECEIVE_COMMENT:
      const { comment } = action;
      return Object.assign({}, state, { [comment.id]: comment });
    case CLEAR_COMMENT:
      const shortenedCommentsOutput = Object.assign({}, state);
      delete shortenedCommentsOutput[action.comment.id];
      return shortenedCommentsOutput;
    default:
      return state;
  }
};

export default commentsReducer;
