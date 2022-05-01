import { FetchingAction, FetchingActionTypes } from '../../actions/fetchingActions'

const postLoadingReducer = (state = false, action: FetchingAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FetchingActionTypes.LOADING_POSTS:
      return true
    case FetchingActionTypes.LOADED_POSTS:
      return false
    default:
      return state
  }
}

export default postLoadingReducer
