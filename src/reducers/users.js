import { createSlice } from "@reduxjs/toolkit"
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setear(state, action) {
      return action.payload
    },
  }
})

export const setUsers = () => {
  return async (dispatch) => {
    try {
      const resp = await userService.getAll()
      dispatch(setear(resp))
      console.log('Users fetched')
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
}

export const { setear } = userSlice.actions
export default userSlice.reducer