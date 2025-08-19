import { createSlice } from '@reduxjs/toolkit'
import { addNoti } from './notifications'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setear(state, action) {
      return action.payload
    },
    createar(state, action) {
      return [...state, action.payload]
    },
    deletear(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    updatear(state, action) {
      const updBlog = action.payload
      return state.map((blog) =>
        (blog.id === updBlog.id ? updBlog : blog)
      )
    }
  }
})

export const setBlogs = () => {
  return async (dispatch) => {
    try {
      const resp = await blogService.getAll()
      dispatch(setear(resp))
      console.log('Blogs fetched')
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const resp = await blogService.create(newBlog)
      dispatch(createar(resp))
      dispatch(addNoti([
        `A new blog "${resp.title}" by ${resp.author} added!`,
        'success'
      ]))
      console.log('Blog successfully created:', resp)
      document.querySelector('form').reset()
    } catch (err) {
      console.error('Error creating blog:', err)
      dispatch(addNoti([err.response.data.error, 'error']))
    }
  }
}

export const updateBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    try {
      const resp = await blogService.update(id, updatedBlog)
      dispatch(updatear(resp))
      dispatch(addNoti([
        `Blog "${resp.title}" updated!`,
        'success'
      ]))
      console.log('Blog successfully updated:', resp)
      document.querySelector('form').reset()
    } catch (error) {
      dispatch(addNoti([
        `Blog not found. Are you trying to update a deleted blog?`,
        'error'
      ]))
      console.error('Error updating blog:', error)
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.dilit(id)
        dispatch(deletear(id))
        dispatch(addNoti(['Blog deleted successfully!', 'success']))
        console.log(`Blog with id ${id} deleted successfully`)
      } catch (error) {
        console.error('Error deleting blog:', error)
        dispatch(addNoti([error.response.data.error, 'error']))
      }
    } else console.log('Blog deletion cancelled')
  }
}

export const likeBlog = (id, likedBlog) => {
  return async (dispatch) => {
    try {
      const resp = await blogService.update(id, likedBlog)
      dispatch(updatear(resp))
    } catch (error) {
      console.error('Error liking blog:', error)
      dispatch(addNoti([error.response.data.error, 'error']))
    }
  }
}

export const commentBlog = (id, content) => {
  return async (dispatch) => {
    try {
      const resp = await blogService.addComment(id, content);
      dispatch(updatear(resp));
      console.log('Comment successfully created:', resp);
    } catch (error) {
      dispatch(addNoti([
        'Oops, something went wrong commenting the blog...',
        'error'
      ]))
      console.error('Error commenting blog:', error)
    }
  }
}

export const { setear, createar, deletear, updatear } = blogSlice.actions
export default blogSlice.reducer