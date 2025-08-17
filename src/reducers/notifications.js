import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    addNoti(state, action) {
      return action.payload
    },
    rmNoti() {
      return []
    }
  }
})

export const { addNoti, rmNoti } = notificationSlice.actions
export default notificationSlice.reducer