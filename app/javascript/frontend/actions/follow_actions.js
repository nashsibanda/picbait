export const RECEIVE_FOLLOWINGS = "RECEIVE_FOLLOWINGS";
export const RECEIVE_FOLLOWERS = "RECEIVE_FOLLOWERS";
export const RECEIVE_FOLLOWING = "RECEIVE_FOLLOWING";
export const RECEIVE_FOLLOWER = "RECEIVE_FOLLOWER";
export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const CLEAR_FOLLOWER = "CLEAR_FOLLOW";
export const CLEAR_FOLLOWING = "CLEAR_FOLLOW";
import * as FollowsAPIUtil from "./../util/follows_api";

const receiveFollowers = follows => ({
  type: RECEIVE_FOLLOWERS,
  follows,
});

const receiveFollowings = follows => ({
  type: RECEIVE_FOLLOWINGS,
  follows,
});

const receiveFollower = follow => ({
  type: RECEIVE_FOLLOWER,
  follow,
});

const receiveFollowing = follow => ({
  type: RECEIVE_FOLLOWING,
  follow,
});

const clearFollower = follow => ({
  type: CLEAR_FOLLOWER,
  follow,
});

const clearFollowing = follow => ({
  type: CLEAR_FOLLOWING,
  follow,
});

export const fetchFollowers = userId => dispatch => {
  const params = { follow_type: "followers" };
  FollowsAPIUtil.getFollows(userId, params).then(follows =>
    dispatch(receiveFollowers(follows))
  );
};

export const fetchFollowings = userId => dispatch => {
  const params = { follow_type: "followings" };
  FollowsAPIUtil.getFollows(userId, params).then(follows =>
    dispatch(receiveFollowings(follows))
  );
};

export const createFollow = userId => dispatch => {
  FollowsAPIUtil.postFollow(userId).then(follow =>
    dispatch(receiveFollower(follow))
  );
};

export const deleteFollow = userId => dispatch => {
  FollowsAPIUtil.deleteFollow(userId).then(follow =>
    dispatch(clearFollower(follow))
  );
};