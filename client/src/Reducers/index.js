import { combineReducers } from 'redux'

import authReducers from './AuthReducer'
import { postReducer, postsReducer } from './PostReducer'
import profileReducer from './ProfileReducer'
export const reducers = combineReducers({
  authReducers,
  postsReducer,
  postReducer,
profileReducer})
