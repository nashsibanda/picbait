export enum PostingActionTypes {
  POSTING_USERS = 'POSTING_USERS',
  POSTED_USERS = 'POSTED_USERS',
  POSTING_POSTS = 'POSTING_POSTS',
  POSTED_POSTS = 'POSTED_POSTS',
  POSTING_LIKES = 'POSTING_LIKES',
  POSTED_LIKES = 'POSTED_LIKES',
  POSTING_FOLLOWS = 'POSTING_FOLLOWS',
  POSTED_FOLLOWS = 'POSTED_FOLLOWS',
  POSTING_COMMENTS = 'POSTING_COMMENTS',
  POSTED_COMMENTS = 'POSTED_COMMENTS',
  POSTING_SESSION = 'POSTING_SESSION',
  POSTED_SESSION = 'POSTED_SESSION',
}

export type PostingAction = {
  type: PostingActionTypes
}

export const postingUsers = (): PostingAction => ({
  type: PostingActionTypes.POSTING_USERS,
})

export const postedUsers = (): PostingAction => ({
  type: PostingActionTypes.POSTED_USERS,
})

export const postingPosts = (): PostingAction => ({
  type: PostingActionTypes.POSTING_POSTS,
})

export const postedPosts = (): PostingAction => ({
  type: PostingActionTypes.POSTED_POSTS,
})

export const postingLikes = (): PostingAction => ({
  type: PostingActionTypes.POSTING_LIKES,
})

export const postedLikes = (): PostingAction => ({
  type: PostingActionTypes.POSTED_LIKES,
})

export const postingFollows = (): PostingAction => ({
  type: PostingActionTypes.POSTING_FOLLOWS,
})

export const postedFollows = (): PostingAction => ({
  type: PostingActionTypes.POSTED_FOLLOWS,
})

export const postingComments = (): PostingAction => ({
  type: PostingActionTypes.POSTING_COMMENTS,
})

export const postedComments = (): PostingAction => ({
  type: PostingActionTypes.POSTED_COMMENTS,
})

export const postingSession = (): PostingAction => ({
  type: PostingActionTypes.POSTING_SESSION,
})

export const postedSession = (): PostingAction => ({
  type: PostingActionTypes.POSTED_SESSION,
})
