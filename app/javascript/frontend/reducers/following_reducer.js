import {
  RECEIVE_FOLLOWINGS,
  RECEIVE_FOLLOWING,
  CLEAR_FOLLOWING,
} from "../actions/follow_actions";

const followingReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FOLLOWINGS:
      const followsOutput = {};
      action.follows.forEach(follow => {
        followsOutput[follow.followee] = follow;
      });
      return followsOutput;
    case RECEIVE_FOLLOWING:
      return Object.assign({}, state, {
        [action.follow.followee]: action.follow,
      });
    case CLEAR_FOLLOWING:
      const shortenedFollows = Object.assign({}, state);
      delete shortenedFollows[action.follow.followee];
      return shortenedFollows;
    default:
      return state;
  }
};

export default followingReducer;
