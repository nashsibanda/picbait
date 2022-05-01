import { combineReducers } from 'redux'
import autocompleteReducer from './autocompleteReducer'
import loadingReducer from './loadingReducer'
import postingReducer from './postingReducer'

const uiReducer = combineReducers({
  loading: loadingReducer,
  autocomplete: autocompleteReducer,
  posting: postingReducer,
})

export default uiReducer
