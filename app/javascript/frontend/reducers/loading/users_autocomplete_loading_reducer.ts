import { FetchingAction, FetchingActionTypes } from '../../actions/fetching_actions'

const usersAutocompleteLoadingReducer = (state = false, action: FetchingAction) => {
  Object.freeze(state)
  switch (action.type) {
    case FetchingActionTypes.LOADING_USERS_AUTOCOMPLETE:
      return true
    case FetchingActionTypes.LOADED_USERS_AUTOCOMPLETE:
      return false
    default:
      return state
  }
}

export default usersAutocompleteLoadingReducer
