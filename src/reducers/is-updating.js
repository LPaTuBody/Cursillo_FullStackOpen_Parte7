import { createSlice } from '@reduxjs/toolkit'

const isUpdSlice = createSlice({
  name: 'isUpdating',
  initialState: null,
  reducers: {
    isUpdating(state, action) {
      console.log('Actualizando blog...')
      return action.payload
    },
    notUpdating() {
      console.log('No se está actualizando ningún blog')
      return null
    }
  }
})

export const { isUpdating, notUpdating } = isUpdSlice.actions
export default isUpdSlice.reducer