import { PostAction, PostActionTypes } from '../actions/postActions'
import { PostsState } from '../types/state'

const postsReducer = (state: PostsState = {}, action: PostAction) => {
  Object.freeze(state)
  switch (action.type) {
    case PostActionTypes.RECEIVE_POSTS:
      const postsOutput: PostsState = {}
      action.posts.forEach(post => {
        postsOutput[post.id] = post
      })
      return postsOutput
    case PostActionTypes.RECEIVE_MORE_POSTS:
      const currentPosts = { ...state }
      action.posts.forEach(p => {
        currentPosts[p.id] = p
      })
      return currentPosts
    case PostActionTypes.RECEIVE_POST:
      const { post } = action
      return { ...state, [post.id]: post }
    case PostActionTypes.CLEAR_POSTS:
      return {}
    case PostActionTypes.CLEAR_POST:
      const shortenedPostsOutput = { ...state }
      delete shortenedPostsOutput[action.post.id]
      return shortenedPostsOutput
    default:
      return state
  }
}

export default postsReducer
