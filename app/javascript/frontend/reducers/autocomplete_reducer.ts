import { CombinedState, combineReducers, Reducer } from 'redux'
import { UsersAutocompleteAction } from '../actions/autocomplete_actions'
import { AutocompleteState } from '../types/state'
import usersAutocompleteReducer from './autocomplete/users_autocomplete_reducer'

const autocompleteReducer: Reducer<CombinedState<AutocompleteState>, UsersAutocompleteAction> = combineReducers({
  users: usersAutocompleteReducer,
})

export default autocompleteReducer
