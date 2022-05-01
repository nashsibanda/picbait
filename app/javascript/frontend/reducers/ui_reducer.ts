import { combineReducers } from 'redux'
import autocompleteReducer from './autocomplete_reducer'
import loadingReducer from './loading_reducer'
import postingReducer from './posting_reducer'

const uiReducer = combineReducers({
  loading: loadingReducer,
  autocomplete: autocompleteReducer,
  posting: postingReducer,
})

export default uiReducer
