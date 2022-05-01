import { AutocompleteUser } from '../types/entities'
import { GlobalDispatch } from '../types/state'
import { getUsersAutocomplete } from '../util/usersApiUtil'
import { loadedUsersAutocomplete, loadingUsersAutocomplete } from './fetchingActions'

export enum UsersAutocompleteActionTypes {
  RECEIVE_USERS_AUTOCOMPLETE = 'RECEIVE_USERS_AUTOCOMPLETE',
}

export type UsersAutocompleteAction = {
  type: UsersAutocompleteActionTypes.RECEIVE_USERS_AUTOCOMPLETE
  users: AutocompleteUser[]
}

const receiveUsersAutocomplete = (users: AutocompleteUser[]) => ({
  type: UsersAutocompleteActionTypes.RECEIVE_USERS_AUTOCOMPLETE,
  users,
})

export const fetchUsersAutocomplete = () => (dispatch: GlobalDispatch) => {
  dispatch(loadingUsersAutocomplete())
  getUsersAutocomplete().then(({ data: users }) => {
    dispatch(receiveUsersAutocomplete(users))
    dispatch(loadedUsersAutocomplete())
  })
}
