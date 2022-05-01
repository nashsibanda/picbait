import { RouterState } from 'connected-react-router'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import {
  ApiErrors,
  AutocompleteUser,
  CommentEntity,
  CurrentUser,
  Follow,
  Like,
  PostEntity,
  UserEntity,
} from './entities'

export type CommentsState = Record<number, CommentEntity>
export type FollowersState = Record<string, Follow>
export type LikesState = Record<number, Record<number, Like>>
export type PostsState = Record<string, PostEntity>
export type SessionState = {
  currentUser: CurrentUser | null
}
export type AuthenticatedSesstionState = {
  currentUser: NonNullable<SessionState['currentUser']>
}
export type UsersAutocompleteState = Record<string, AutocompleteUser>
export type UsersState = Record<string, UserEntity>

export type GlobalLikesState = {
  comments: LikesState
  posts: LikesState
}

export type FollowsState = {
  followers: FollowersState
  following: FollowersState
}

export type EntitiesState = {
  comments: CommentsState
  follows: FollowsState
  likes: GlobalLikesState
  posts: PostsState
  users: UsersState
}

export type GlobalErrorsState = {
  session: ApiErrors
  user: ApiErrors
  post: ApiErrors
}

export type AutocompleteState = {
  users: UsersAutocompleteState
}

export type LoadingState = {
  comments: boolean
  follows: boolean
  likes: boolean
  postPage: boolean
  posts: boolean
  session: boolean
  users: boolean
  usersAutocomplete: boolean
}

export type PostingState = {
  comments: boolean
  posts: boolean
  users: boolean
}

export type UiState = {
  autocomplete: AutocompleteState
  loading: LoadingState
  posting: PostingState
}

interface BaseState {
  entities: EntitiesState
  errors: GlobalErrorsState
  router: RouterState
  ui: UiState
}

export interface GlobalState extends BaseState {
  session: SessionState
}

export interface AuthenticatedGlobalState extends BaseState {
  session: AuthenticatedSesstionState
}

export type GlobalDispatch = ThunkDispatch<GlobalState | AuthenticatedGlobalState, void, AnyAction>
