import { UsersAutocompleteAction, UsersAutocompleteActionTypes } from '../../actions/autocomplete_actions'
import { AutocompleteUser } from '../../util/types'

const usersAutocompleteReducer = (state: Record<string, AutocompleteUser> = {}, action: UsersAutocompleteAction) => {
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
