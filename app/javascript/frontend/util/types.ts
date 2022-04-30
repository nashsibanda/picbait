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
