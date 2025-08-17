import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notifications'
import blogReducer from './reducers/blogs'
import userReducer from './reducers/users'
import userLogedReducer from './reducers/loged-user'
import isUpdReducer from './reducers/is-updating'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
    logedUser: userLogedReducer,
    isUpdating: isUpdReducer
  }
})