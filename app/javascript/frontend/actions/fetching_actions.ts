export enum FetchingActionTypes {
  LOADING_USERS = 'LOADING_USERS',
  LOADED_USERS = 'LOADED_USERS',
  LOADING_POSTS = 'LOADING_POSTS',
  LOADED_POSTS = 'LOADED_POSTS',
  LOADING_POST_PAGE = 'LOADING_POST_PAGE',
  LOADED_POST_PAGE = 'LOADED_POST_PAGE',
  LOADING_LIKES = 'LOADING_LIKES',
  LOADED_LIKES = 'LOADED_LIKES',
  LOADING_FOLLOWS = 'LOADING_FOLLOWS',
  LOADED_FOLLOWS = 'LOADED_FOLLOWS',
  LOADING_COMMENTS = 'LOADING_COMMENTS',
  LOADED_COMMENTS = 'LOADED_COMMENTS',
  LOADING_SESSION = 'LOADING_SESSION',
  LOADED_SESSION = 'LOADED_SESSION',
  LOADING_USERS_AUTOCOMPLETE = 'LOADING_USERS_AUTOCOMPLETE',
  LOADED_USERS_AUTOCOMPLETE = 'LOADED_USERS_AUTOCOMPLETE',
}

export type FetchingAction = {
  type: FetchingActionTypes
}

export const loadingUsers = (): FetchingAction => ({
  type: FetchingActionTypes.LOADING_USERS,
})

export const loadedUsers = (): FetchingAction => ({
  type: FetchingActionTypes.LOADED_USERS,
})

export const loadingPosts = (): FetchingAction => ({
  type: FetchingActionTypes.LOADING_POSTS,
})

export const loadedPosts = (): FetchingAction => ({
  type: FetchingActionTypes.LOADED_POSTS,
})

export const loadingPostPage = (): FetchingAction => ({
  type: FetchingActionTypes.LOADING_POST_PAGE,
})

export const loadedPostPage = (): FetchingAction => ({
  type: FetchingActionTypes.LOADED_POST_PAGE,
})

export const loadingLikes = (): FetchingAction => ({
  type: FetchingActionTypes.LOADING_LIKES,
})

export const loadedLikes = (): FetchingAction => ({
  type: FetchingActionTypes.LOADED_LIKES,
})

export const loadingFollows = (): FetchingAction => ({
  type: FetchingActionTypes.LOADING_FOLLOWS,
})

export const loadedFollows = (): FetchingAction => ({
  type: FetchingActionTypes.LOADED_FOLLOWS,
})

export const loadingComments = (): FetchingAction => ({
  type: FetchingActionTypes.LOADING_COMMENTS,
})

export const loadedComments = (): FetchingAction => ({
  type: FetchingActionTypes.LOADED_COMMENTS,
})

export const loadingSession = (): FetchingAction => ({
  type: FetchingActionTypes.LOADING_SESSION,
})

export const loadedSession = (): FetchingAction => ({
  type: FetchingActionTypes.LOADED_SESSION,
})

export const loadingUsersAutocomplete = (): FetchingAction => ({
  type: FetchingActionTypes.LOADING_USERS_AUTOCOMPLETE,
})

export const loadedUsersAutocomplete = (): FetchingAction => ({
  type: FetchingActionTypes.LOADED_USERS_AUTOCOMPLETE,
})
