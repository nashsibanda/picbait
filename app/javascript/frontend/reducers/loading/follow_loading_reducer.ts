import { FetchingAction, FetchingActionTypes } from '../../actions/fetching_actions'

const followLoadingReducer = (state = false, action: FetchingAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FetchingActionTypes.LOADING_FOLLOWS:
      return true
    case FetchingActionTypes.LOADED_FOLLOWS:
      return false
    default:
      return state
  }
}

export default followLoadingReducer
