import { LikeAction, LikeActionTypes } from '../actions/like_actions'
import { PostAction, PostActionTypes } from '../actions/post_actions'
import { LikesState } from '../types/state'
import { Like } from '../util/types'

const postLikesReducer = (state: LikesState = {}, action: LikeAction | PostAction) => {
  Object.freeze(state)
  switch (action.type) {
    case PostActionTypes.RECEIVE_POSTS:
      const likesOutput: LikesState = {}
      action.posts.forEach(post => {
        const postLikes: Record<number, Like> = {}
        post.likes.forEach(like => {
          postLikes[like.api_user_id] = like
        })
        likesOutput[post.id] = postLikes
      })
      return likesOutput
    case PostActionTypes.RECEIVE_MORE_POSTS:
      const currentLikes = { ...state }
      action.posts.forEach(post => {
        const newPostLikes: Record<number, Like> = {}
        post.likes.forEach(like => {
          newPostLikes[like.api_user_id] = like
        })
        currentLikes[post.id] = newPostLikes
      })
      return currentLikes
    case PostActionTypes.RECEIVE_POST:
      const { post } = action
      const thisPostLikes: Record<number, Like> = {}
      post.likes.forEach(like => {
        thisPostLikes[like.api_user_id] = like
      })
      return { ...state, [post.id]: thisPostLikes }
    case LikeActionTypes.RECEIVE_POST_LIKE:
      const statePostLikes = { ...state }
      const { like } = action
      const likedPost = statePostLikes[like.likeable_id]
      likedPost[like.api_user_id] = like
      statePostLikes[like.likeable_id] = likedPost
      return statePostLikes
    case LikeActionTypes.CLEAR_POST_LIKE:
      const oldLike = action.like
      const oldPostLikes = { ...state }
      const postToClear = oldPostLikes[oldLike.likeable_id]
      delete postToClear[oldLike.api_user_id]
      oldPostLikes[oldLike.likeable_id] = postToClear
      return oldPostLikes
    case PostActionTypes.CLEAR_POSTS:
      return {}
    default:
      return state
  }
}

export default postLikesReducer
