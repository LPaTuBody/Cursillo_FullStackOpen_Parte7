import { createSlice } from "@reduxjs/toolkit"
import { addNoti, rmNoti } from "./notifications"
import blogService from '../services/blogs'
import loginService from '../services/login'

const logedUserSlice = createSlice({
  name: 'logedUser',
  initialState: null,
  reducers: {
    setear(state, action) {
      return action.payload
    },
  }
})

export const checkUserLoged = () => {
  return async (dispatch) => {
    try {
      const rawUser = window.localStorage.getItem('userLogedIn')
      if (rawUser) {
        const user = JSON.parse(rawUser)
        blogService.setToken(user.token)
        dispatch(setear(user))
      }
    } catch (error) {
      console.error('Error login user:', error)
    }
  }
}

export const handleLogin = (userObj) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObj)
      window.localStorage.setItem('userLogedIn', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setear(user))
      dispatch(rmNoti())
    } catch (error) {
      dispatch(addNoti([error.response.data.error, 'error']))
      console.log('Login error: ', error)
    }
  }
}

export const handleLogout = () => {
  return async (dispatch) => {
    try {
      window.localStorage.clear()
      dispatch(setear(null))
      dispatch(rmNoti())
    } catch (error) {
      dispatch(addNoti([error.response.data.error, 'error']))
      console.log('Logout error: ', error)
    }
  }
}

export const { setear } = logedUserSlice.actions
export default logedUserSlice.reducer