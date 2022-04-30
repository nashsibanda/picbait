import { FetchingAction, FetchingActionTypes } from '../../actions/fetching_actions'

const userLoadingReducer = (state = false, action: FetchingAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FetchingActionTypes.LOADING_USERS:
      return true
    case FetchingActionTypes.LOADED_USERS:
      return false
    default:
      return state
  }
}

export default userLoadingReducer
