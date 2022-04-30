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
  id: number
  likeable_id: number
  likeable_type: LikeableType
  likerSlug: string
}
