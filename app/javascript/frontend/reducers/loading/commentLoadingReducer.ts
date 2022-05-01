import { FetchingAction, FetchingActionTypes } from '../../actions/fetchingActions'

const commentLoadingReducer = (state = false, action: FetchingAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FetchingActionTypes.LOADING_COMMENTS:
      return true
    case FetchingActionTypes.LOADED_COMMENTS:
      return false
    default:
      return state
  }
}

export default commentLoadingReducer
