import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './icons'

import { setUsers } from './reducers/users'
import { checkUserLoged, handleLogout } from './reducers/loged-user'
import {
  setBlogs,
  createBlog,
  updateBlog,
} from './reducers/blogs'

import List from './components/List'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


function App() {
  const [edBlog, setEdBlog] = useState(null)
  const user = useSelector(state => state.logedUser)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBlogs())
    dispatch(setUsers())
    dispatch(checkUserLoged())
  }, [])

  const handleUserLogout = () => {
    dispatch(handleLogout())
    setEdBlog(null)
  }

  const handleBlogSubmit = (newBlog) => {
    if (edBlog) {
      dispatch(updateBlog(edBlog.id, newBlog))
      setEdBlog(null)
    } else dispatch(createBlog(newBlog))
  }

  /* --------------------------------------------------- */

  // Sin usuario logueado
  if (user === null) return (
    <>
      <div className="header">
        <h1>Log-in to App</h1>
      </div>
      <div className="form_container">
        <LoginForm />
      </div>
      <Notification />
    </>
  )

  // Con usuario logueado
  return (
    <>
      <div className="header">
        <p className="welcome_msg">
          Hello <span>{user.name}</span>!
        </p>
        <h1>Want to save a blog?</h1>
      </div>

      <div className="form_container">
        <Togglable buttonLabel={'Yes, I want to!'} ref={blogFormRef}>
          <h2>Add a Blog</h2>
          <BlogForm
            handleSubmit={handleBlogSubmit}
            rstUpd={() => setEdBlog(null)}
            blogFormRef={blogFormRef}
          />
        </Togglable>
      </div>

      <div className="list_container">
        <h2>Blog List</h2>
        <List
          userLoged={user}
          updatingBlog={(toUpdBlog) => setEdBlog(toUpdBlog)}
          blogFormRef={blogFormRef}
        />
      </div>

      <div className="logout_container">
        <button className="logout" onClick={() => handleUserLogout()}>
          <FontAwesomeIcon icon="fa-arrow-right-from-bracket" />
        </button>
      </div>

      <Notification />
    </>
  )
}

export default App