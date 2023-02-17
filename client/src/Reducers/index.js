import { combineReducers } from 'redux'

import authReducers from './AuthReducer'
import postReducer from './PostReducer'
export const reducers = combineReducers({authReducers,postReducer})
