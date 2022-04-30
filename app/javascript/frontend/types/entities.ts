import { AxiosError, AxiosResponse } from 'axios'

/* eslint-disable camelcase */
export type User = {
  username: string
  password?: string
  email?: string
  bio?: string
  avatarUrl?: string
  slug?: string
  id?: number
  postCount?: number
  lowercase_username?: string
}

export type SessionUser = Pick<User, 'email' | 'username' | 'password' | 'lowercase_username'>
export type UserEntity = Required<Pick<User, 'avatarUrl' | 'bio' | 'id' | 'postCount' | 'slug' | 'username'>>
export type AutocompleteUser = [string, string]

export type Follow = {
  id: number
  followee_id: number
  follower_id: number
  follower: string
  followee: string
}

export type ApiErrors = string[]

interface ApiErrorResp extends AxiosResponse {
  data: ApiErrors
}

export interface ApiError extends AxiosError {
  response: ApiErrorResp
}

export enum FollowType {
  followers = 'followers',
  followings = 'followings',
}

export enum LikeableType {
  comment = 'Api::Comment',
  post = 'Api::Post',
}

export type Like = {
  api_user_id: number
  created_at: Date
  id: number
  likeable_id: number
  likeable_type: LikeableType
  likerSlug: string
  updated_at: Date
}

export type CommentEntity = {
  body: string
  commenter: string
  date: string
  id: number
  likes: Like[]
  parentCommentId: number | null
  timeAgo: string
}

export type PostEntity = {
  authorSlug: string
  authorUsername: string
  created_at: Date
  creationNum: number
  date: string // A string representation of what date this post represents, not necessarily when it was created
  description: string
  id: number
  imageUrl: string
  likes: Like[]
  title: string
}
