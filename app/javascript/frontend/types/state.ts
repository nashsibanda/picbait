import { AutocompleteUser, CommentEntity, Follow, Like, PostEntity, UserEntity } from '../util/types'

export type CommentsState = Record<number, CommentEntity>
export type FollowersState = Record<string, Follow>
export type LikesState = Record<number, Record<number, Like>>
export type PostsState = Record<string, PostEntity>
export type SessionState = {
  currentUser: {
    id: number
    slug: string
  } | null
}
export type UsersAutocompleteState = Record<string, AutocompleteUser>
export type UsersState = Record<string, UserEntity>
