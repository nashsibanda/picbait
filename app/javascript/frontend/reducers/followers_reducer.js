import {
  RECEIVE_FOLLOWERS,
  RECEIVE_FOLLOWER,
  CLEAR_FOLLOWER,
} from "../actions/follow_actions";

const followersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FOLLOWERS:
      const followsOutput = {};
      action.follows.forEach(follow => {
        followsOutput[follow.follower] = follow;
      });
      return followsOutput;
    case RECEIVE_FOLLOWER:
      return Object.assign({}, state, {
        [action.follow.follower]: action.follow,
      });
    case CLEAR_FOLLOWER:
      const shortenedFollows = Object.assign({}, state);
      delete shortenedFollows[action.follow.follower];
      return shortenedFollows;
    default:
      return state;
  }
};

export default followersReducer;
