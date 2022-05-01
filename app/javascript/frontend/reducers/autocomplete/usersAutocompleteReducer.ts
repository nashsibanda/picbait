import { UsersAutocompleteAction, UsersAutocompleteActionTypes } from '../../actions/autocompleteActions'
import { AutocompleteUser } from '../../types/entities'
import { UsersAutocompleteState } from '../../types/state'

const usersAutocompleteReducer = (state: UsersAutocompleteState = {}, action: UsersAutocompleteAction) => {
  Object.freeze(state)
  switch (action.type) {
    case UsersAutocompleteActionTypes.RECEIVE_USERS_AUTOCOMPLETE:
      const outputAutocomplete: Record<string, AutocompleteUser> = {}
      action.users.forEach(user => {
        outputAutocomplete[user[0]] = user
      })
      return outputAutocomplete
    default:
      return state
  }
}

export default usersAutocompleteReducer
