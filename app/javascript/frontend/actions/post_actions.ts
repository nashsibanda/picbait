import { push } from 'connected-react-router'
import { Dispatch } from 'redux'
import * as CommentsAPIUtil from '../util/comments_api_util'
import * as PostsAPIUtil from '../util/posts_api_util'
import { ApiErrors, PostEntity } from '../util/types'
import { fetchUsersAutocomplete } from './autocomplete_actions'
import { receiveComments } from './comment_actions'
import {
  loadedComments,
  loadedPostPage,
  loadedPosts,
  loadingComments,
  loadingPostPage,
  loadingPosts,
} from './fetching_actions'
import { postedPosts, postingPosts } from './posting_actions'
import { fetchUsers } from './user_actions'

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

const dispatchPosts = (page: number, posts: PostEntity[], dispatch: Dispatch) => {
  if (page === 1) {
    dispatch(receivePosts(posts))
  } else {
    dispatch(receiveMorePosts(posts))
  }
  dispatch(loadedPostPage())
}

export const fetchUserPosts = (userId: number, page: number) => (dispatch: Dispatch) => {
  dispatch(loadingPostPage())
  PostsAPIUtil.getUserPosts(userId, page).then(({ data: posts }) => dispatchPosts(page, posts, dispatch))
}

export const fetchFeedPosts = (page: number) => (dispatch: Dispatch) => {
  dispatch(loadingPostPage())

  PostsAPIUtil.getFeedPosts(page).then(({ data: posts }) => dispatchPosts(page, posts, dispatch))
}

export const fetchMoreFeedPosts = (page: number) => (dispatch: Dispatch) => {
  dispatch(loadingPostPage())
  PostsAPIUtil.getFeedPosts(page).then(({ data: posts }) => {
    dispatch(receiveMorePosts(posts))
    dispatch(loadedPostPage())
  })
}

export const fetchPost = (id: number, shouldFetchPost: boolean) => (dispatch: Dispatch) => {
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
  // TODO: Need to come back and properly type these Dispatch elements
  // @ts-expect-error
  dispatch(fetchUsersAutocomplete())
  // @ts-expect-error
  dispatch(fetchUsers({ post_id: id }))
}

export const createPost = (formPost: FormData, userSlug: string) => (dispatch: Dispatch) => {
  dispatch(postingPosts())
  PostsAPIUtil.postPost(formPost).then(
    ({ data: post }) => {
      dispatch(receivePost(post))
      dispatch(postedPosts())
      dispatch(push(`/users/${userSlug}`))
    },
    errors => {
      dispatch(receivePostErrors(errors.responseJSON))
      dispatch(postedPosts())
    }
  )
}

export const deletePost = (id: number, userSlug: string) => (dispatch: Dispatch) => {
  PostsAPIUtil.deletePost(id).then(
    ({ data: post }) => {
      dispatch(clearPost(post))
      dispatch(push(`/users/${userSlug}`))
    },
    errors => dispatch(receivePostErrors(errors.responseJSON))
  )
}
