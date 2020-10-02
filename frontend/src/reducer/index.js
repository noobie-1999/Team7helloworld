import { combineReducers } from 'redux'
import authReducer from './auth.Reducer'
import errReducer from './err.Reducer'

export default combineReducers({
    auth: authReducer,
    err: errReducer
})