import { useState, useEffect, useRef, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './icons'

import { useNotiDispatch, rmNoti } from './contexts/NotiContext'
import { useBlogDispatch, setBlogs } from './contexts/BlogContext'
import LoginContext, { login, logout } from './contexts/LoginContext'
import { useUsersDispatch, useUsers, setUsers } from './contexts/UsersContext'

import { useCheckingUser } from './hooks/loginHooks'
import { useBlogs, useBlogMutation } from './hooks/blogHooks'

import List from './components/List'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

function App() {
  const [edBlog, setEdBlog] = useState(null)

  const blogFormRef = useRef()
  const firtsRender = useRef(true)

  const notiDispatch = useNotiDispatch()
  const blogDispatch = useBlogDispatch()
  const usersDispatch = useUsersDispatch()

  const checkingUser = useCheckingUser()

  const [user, loginDispatch] = useContext(LoginContext)

  const { createBlog, updateBlog } = useBlogMutation()

  const {
    data: blogsData,
    isLoading: blogsLoading,
    isError: blogsError,
  } = useBlogs()
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useUsers()

  /*  ---------------------------------------  */

  useEffect(() => {
    if (firtsRender.current && blogsData && usersData) {
      blogDispatch(setBlogs(blogsData))
      console.log('Blogs fetched')
      usersDispatch(setUsers(usersData))
      console.log('Users fetched')

      firtsRender.current = false
    }
  }, [blogsData, usersData])

  useEffect(() => {
    loginDispatch(login(checkingUser))
  }, [])

  if (blogsLoading || usersLoading) return <div>Loading data...</div>
  else if (blogsError || usersError) {
    return <div>Oops, we're experimenting some problems in server...</div>
  }

  /*  ---------------------------------------  */

  const handleLogout = () => {
    window.localStorage.clear()
    loginDispatch(logout())
    notiDispatch(rmNoti())
    setEdBlog(null)
  }

  const handleBlogSubmit = (newBlog) => {
    if (edBlog) {
      updateBlog({ id: edBlog.id, updBlog: newBlog })
      setEdBlog(null)
    } else createBlog(newBlog)
  }

  /*  ---------------------------------------------  */

  // Sin usuario logueado
  if (!user)
    return (
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
          updatingBlog={(toUpdBlog) => setEdBlog(toUpdBlog)}
          blogFormRef={blogFormRef}
        />
      </div>

      <div className="logout_container">
        <button className="logout" onClick={() => handleLogout()}>
          <FontAwesomeIcon icon="fa-arrow-right-from-bracket" />
        </button>
      </div>

      <Notification />
    </>
  )
}

export default App
