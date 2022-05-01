import { FetchingAction, FetchingActionTypes } from '../../actions/fetching_actions'

const likeLoadingReducer = (state = false, action: FetchingAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FetchingActionTypes.LOADING_LIKES:
      return true
    case FetchingActionTypes.LOADED_LIKES:
      return false
    default:
      return state
  }
}

export default likeLoadingReducer
