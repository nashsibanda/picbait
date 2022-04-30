import { LikeActionTypes } from '../actions/like_actions'
import { CLEAR_POSTS, RECEIVE_MORE_POSTS, RECEIVE_POST, RECEIVE_POSTS } from '../actions/post_actions'
import { Like } from '../util/types'

const postLikesReducer = (state: Record<number, Record<number, Like>> = {}, action: LikeActionTypes | any) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_POSTS:
      const likesOutput: Record<number, Record<number, Like>> = {}
      action.posts.forEach(post => {
        const postLikes: Record<number, Like> = {}
        post.likes.forEach(like => {
          postLikes[like.api_user_id] = like
        })
        likesOutput[post.id] = postLikes
      })
      return likesOutput
    case RECEIVE_MORE_POSTS:
      const currentLikes = Object.assign({}, state)
      action.posts.forEach(post => {
        const newPostLikes: Record<number, Like> = {}
        post.likes.forEach(like => {
          newPostLikes[like.api_user_id] = like
        })
        currentLikes[post.id] = newPostLikes
      })
      return currentLikes
    case RECEIVE_POST:
      const { post } = action
      const thisPostLikes: Record<number, Like> = {}
      post.likes.forEach(like => {
        thisPostLikes[like.api_user_id] = like
      })
      return Object.assign({}, state, { [post.id]: thisPostLikes })
    case LikeActionTypes.RECEIVE_POST_LIKE:
      const statePostLikes = Object.assign({}, state)
      const { like } = action
      const likedPost = statePostLikes[like.likeable_id]
      likedPost[like.api_user_id] = like
      statePostLikes[like.likeable_id] = likedPost
      return statePostLikes
    case LikeActionTypes.CLEAR_POST_LIKE:
      const oldLike = action.like
      const oldPostLikes = Object.assign({}, state)
      const postToClear = oldPostLikes[oldLike.likeable_id]
      delete postToClear[oldLike.api_user_id]
      oldPostLikes[oldLike] = postToClear
      return oldPostLikes
    case CLEAR_POSTS:
      return {}
    default:
      return state
  }
}

export default postLikesReducer
