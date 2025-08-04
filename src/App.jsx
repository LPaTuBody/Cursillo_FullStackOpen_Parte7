import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './icons'

import List from './components/List'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

function App() {
  const [blogs, setBlog] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')
  const [edBlog, setEdBlog] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((response) => {
        console.log('Blogs fetched')
        setBlog(response)
      })
      .catch((error) => console.error('Error fetching blogs:', error))

    const fetchingUsers = async () => {
      try {
        const resp = await userService.getAll()
        setUsers(resp)
        console.log('Users fetched')
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchingUsers()
  }, []) // tomando los blogs y los usuarios

  useEffect(() => {
    const rawUser = window.localStorage.getItem('userLogedIn')
    if (rawUser) {
      const user = JSON.parse(rawUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, []) // tomando el usuario logueado

  const configNoti = (message, type) => {
    setMessage(message)
    setType(type)
  }

  const handleLogin = async (userObj) => {
    try {
      const user = await loginService.login(userObj)
      window.localStorage.setItem('userLogedIn', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setMessage(null)
      setType('')
    } catch (error) {
      configNoti(error.response.data.error, 'error')
      console.log('Login error: ', error)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    configNoti(null, '')
    setEdBlog(null)
  }

  const handleCreate = (newBlog) => {
    blogService
      .create(newBlog)
      .then((response) => {
        setBlog(blogs.concat(response))
        configNoti(
          `A new blog "${response.title}" by ${response.author} added!`,
          'success',
        )
        console.log('Blog successfully created:', response)
        document.querySelector('form').reset()
      })
      .catch((error) => {
        configNoti(error.response.data.error, 'error')
        console.error('Error creating blog:', error)
      })
  }

  const handleUpdate = (id, updatedBlog) => {
    blogService
      .update(id, updatedBlog)
      .then((response) => {
        setBlog(blogs.map((blog) => (blog.id === id ? response : blog)))
        configNoti(`Blog "${response.title}" updated!`, 'success')
        console.log('Blog successfully updated:', response)
        document.querySelector('form').reset()
      })
      .catch((error) => {
        configNoti(
          'Blog not found. Are you trying to update a deleted blog?',
          'error',
        )
        console.error('Error updating blog:', error)
      })
  }

  const handleBlogSubmit = (newBlog) => {
    if (edBlog) {
      handleUpdate(edBlog.id, newBlog)
      setEdBlog(null)
    } else handleCreate(newBlog)
  }

  const onDltClick = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?'))
      blogService
        .dilit(id)
        .then(() => {
          setBlog(blogs.filter((blog) => blog.id !== id))
          configNoti('Blog deleted successfully!', 'success')
          console.log(`Blog with id ${id} deleted successfully`)
        })
        .catch((error) => {
          configNoti(error.response.data.error, 'error')
          console.error('Error deleting blog:', error)
        })
    else console.log('Blog deletion cancelled')
  }

  const onLikeClick = async (id, likedBlog) => {
    try {
      const response = await blogService.update(id, likedBlog)
      setBlog(blogs.map((blog) => (blog.id === id ? response : blog)))
    } catch (error) {
      configNoti(error.response.data.error, 'error')
      console.error('Error liking blog:', error)
    }
  }

  // Sin usuario logueado
  if (user === null)
    return (
      <>
        <div className="header">
          <h1>Log-in to App</h1>
        </div>
        <div className="form_container">
          <LoginForm handleLogin={handleLogin} />
        </div>
        <div>
          <Notification
            message={message}
            type={type}
            onClose={() => {
              setMessage(null)
              setType('')
            }}
          />
        </div>
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
            rstUpd={() => {
              setEdBlog(null)
            }}
            configNoti={configNoti}
            blogFormRef={blogFormRef}
          />
        </Togglable>
      </div>

      <div className="list_container">
        <h2>Blog List</h2>
        <List
          blogs={blogs}
          users={users}
          userLoged={user}
          onDltClick={onDltClick}
          updatingBlog={(toUpdBlog) => setEdBlog(toUpdBlog)}
          likingBlog={onLikeClick}
          blogFormRef={blogFormRef}
          configNoti={configNoti}
        />
      </div>

      <div>
        <Notification
          message={message}
          type={type}
          onClose={() => {
            setMessage(null)
            setType('')
          }}
        />
      </div>

      <div className="logout_container">
        <button className="logout" onClick={() => handleLogout()}>
          <FontAwesomeIcon icon="fa-arrow-right-from-bracket" />
        </button>
      </div>
    </>
  )
}

export default App
