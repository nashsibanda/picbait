import { FetchingAction, FetchingActionTypes } from '../../actions/fetching_actions'

const sessionLoadingReducer = (state = false, action: FetchingAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FetchingActionTypes.LOADING_SESSION:
      return true
    case FetchingActionTypes.LOADED_SESSION:
      return false
    default:
      return state
  }
}

export default sessionLoadingReducer
