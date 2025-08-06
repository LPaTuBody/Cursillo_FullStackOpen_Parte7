import { useReducer, createContext, useContext } from 'react'

const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'SETEAR':
      return action.payload
    default:
      return state
  }
}

export const setBlogs = (payload) => ({ type: 'SETEAR', payload })

/* -------------------------------------------- */

const BlogContext = createContext()

export const BlogContextProvider = (props) => {
  const [blog, blogDispatch] = useReducer(blogsReducer, [])
  return (
    <BlogContext.Provider value={[blog, blogDispatch]}>
      {props.children}
    </BlogContext.Provider>
  )
}

export const useBlogValue = () => {
  const contexto = useContext(BlogContext)
  return contexto[0]
}

export const useBlogDispatch = () => {
  const contexto = useContext(BlogContext)
  return contexto[1]
}

export default BlogContext
