import { push } from 'connected-react-router'
import { ApiError, ApiErrors, PostEntity } from '../types/entities'
import { GlobalDispatch } from '../types/state'
import * as CommentsAPIUtil from '../util/commentsApiUtil'
import * as PostsAPIUtil from '../util/postsApiUtil'
import { fetchUsersAutocomplete } from './autocompleteActions'
import { receiveComments } from './commentActions'
import {
  loadedComments,
  loadedPostPage,
  loadedPosts,
  loadingComments,
  loadingPostPage,
  loadingPosts,
} from './fetchingActions'
import { postedPosts, postingPosts } from './postingActions'
import { fetchUsers } from './userActions'

export enum PostActionTypes {
  RECEIVE_POSTS = 'RECEIVE_POSTS',
  RECEIVE_MORE_POSTS = 'RECEIVE_MORE_POSTS',
  RECEIVE_POST = 'RECEIVE_POST',
  CLEAR_POST = 'CLEAR_POST',
  CLEAR_POSTS = 'CLEAR_POSTS',
  RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS',
}

type MultiPostAction = {
  type: PostActionTypes.RECEIVE_MORE_POSTS | PostActionTypes.RECEIVE_POSTS
  posts: PostEntity[]
}

type SinglePostAction = {
  type: PostActionTypes.CLEAR_POST | PostActionTypes.RECEIVE_POST
  post: PostEntity
}

type PostErrorAction = {
  type: PostActionTypes.RECEIVE_POST_ERRORS
  errors: ApiErrors
}

type PostEmptyAction = {
  type: PostActionTypes.CLEAR_POSTS
}

export type PostAction = MultiPostAction | SinglePostAction | PostErrorAction | PostEmptyAction

const receivePosts = (posts: PostEntity[]): MultiPostAction => ({
  type: PostActionTypes.RECEIVE_POSTS,
  posts,
})

const receiveMorePosts = (posts: PostEntity[]): MultiPostAction => ({
  type: PostActionTypes.RECEIVE_MORE_POSTS,
  posts,
})

const receivePost = (post: PostEntity): SinglePostAction => ({
  type: PostActionTypes.RECEIVE_POST,
  post,
})

export const clearPosts = (): PostEmptyAction => ({
  type: PostActionTypes.CLEAR_POSTS,
})

const clearPost = (post: PostEntity): SinglePostAction => ({
  type: PostActionTypes.CLEAR_POST,
  post,
})

const receivePostErrors = (errors: ApiErrors): PostErrorAction => ({
  type: PostActionTypes.RECEIVE_POST_ERRORS,
  errors,
})

const dispatchPosts = (page: number, posts: PostEntity[], dispatch: GlobalDispatch) => {
  if (page === 1) {
    dispatch(receivePosts(posts))
  } else {
    dispatch(receiveMorePosts(posts))
  }
  dispatch(loadedPostPage())
}

export const fetchUserPosts = (userId: string, page: number) => (dispatch: GlobalDispatch) => {
  dispatch(loadingPostPage())
  PostsAPIUtil.getUserPosts(userId, page).then(({ data: posts }) => dispatchPosts(page, posts, dispatch))
}

export const fetchFeedPosts = (page: number) => (dispatch: GlobalDispatch) => {
  dispatch(loadingPostPage())

  PostsAPIUtil.getFeedPosts(page).then(({ data: posts }) => dispatchPosts(page, posts, dispatch))
}

export const fetchMoreFeedPosts = (page: number) => (dispatch: GlobalDispatch) => {
  dispatch(loadingPostPage())
  PostsAPIUtil.getFeedPosts(page).then(({ data: posts }) => {
    dispatch(receiveMorePosts(posts))
    dispatch(loadedPostPage())
  })
}

export const fetchPost = (id: number, shouldFetchPost: boolean) => (dispatch: GlobalDispatch) => {
  dispatch(loadingComments())
  if (shouldFetchPost) {
    dispatch(loadingPosts())
    PostsAPIUtil.getPost(id).then(({ data: post }) => {
      dispatch(receivePost(post))
      dispatch(loadedPosts())
    })
  }
  CommentsAPIUtil.getComments(id).then(({ data: comments }) => {
    dispatch(receiveComments(comments))
    dispatch(loadedComments())
  })
  dispatch(fetchUsersAutocomplete())
  dispatch(fetchUsers({ post_id: id }))
}

export const createPost = (formPost: FormData, userSlug: string) => (dispatch: GlobalDispatch) => {
  dispatch(postingPosts())
  PostsAPIUtil.postPost(formPost).then(
    ({ data: post }) => {
      dispatch(receivePost(post))
      dispatch(postedPosts())
      dispatch(push(`/users/${userSlug}`))
    },
    (errors: ApiError) => {
      dispatch(receivePostErrors(errors.response.data))
      dispatch(postedPosts())
    }
  )
}

export const deletePost = (id: number, userSlug: string) => (dispatch: GlobalDispatch) => {
  PostsAPIUtil.deletePost(id).then(
    ({ data: post }) => {
      dispatch(clearPost(post))
      dispatch(push(`/users/${userSlug}`))
    },
    (errors: ApiError) => dispatch(receivePostErrors(errors.response.data))
  )
}
