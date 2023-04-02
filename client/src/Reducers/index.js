import { combineReducers } from 'redux'

import authReducers from './AuthReducer'
import { postReducer, postsReducer } from './PostReducer'
import profileReducer from './ProfileReducer'
import { usersReducer } from './UsersReducer'

export const reducers = combineReducers({
  authReducers,
  postsReducer,
  postReducer,
  profileReducer,
usersReducer})
