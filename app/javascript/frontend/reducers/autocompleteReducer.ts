import { CombinedState, combineReducers, Reducer } from 'redux'
import { UsersAutocompleteAction } from '../actions/autocompleteActions'
import { AutocompleteState } from '../types/state'
import usersAutocompleteReducer from './autocomplete/usersAutocompleteReducer'

const autocompleteReducer: Reducer<CombinedState<AutocompleteState>, UsersAutocompleteAction> = combineReducers({
  users: usersAutocompleteReducer,
})

export default autocompleteReducer
