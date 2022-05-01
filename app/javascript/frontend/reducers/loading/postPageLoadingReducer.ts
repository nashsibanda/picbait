import { FetchingAction, FetchingActionTypes } from '../../actions/fetchingActions'

const postPageLoadingReducer = (state = false, action: FetchingAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FetchingActionTypes.LOADING_POST_PAGE:
      return true
    case FetchingActionTypes.LOADED_POST_PAGE:
      return false
    default:
      return state
  }
}

export default postPageLoadingReducer
