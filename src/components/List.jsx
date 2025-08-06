import { useEffect, useRef } from 'react'
import { useNotiDispatch, setNoti } from '../contexts/NotiContext'
import { useBlogValue } from '../contexts/BlogContext'
import { useUserLoged } from '../contexts/LoginContext'
import { useBlogMutation } from '../hooks/blogHooks'
import { useUsersValue } from '../contexts/UsersContext'

const List = ({ updatingBlog, blogFormRef }) => {
  if (typeof blogFormRef !== 'object')
    throw new Error('blogFormRef need to be an object')
  if (typeof updatingBlog !== 'function')
    throw new Error('updatingBlog need to be an function')
  // prop-types don't work with React 19

  const alreadyHidden = useRef(false)
  const notiDispatch = useNotiDispatch()
  const { deleteBlog, likeBlog } = useBlogMutation()

  const blogs = useBlogValue()
  const userLoged = useUserLoged()
  const users = useUsersValue()

  useEffect(() => {
    if (blogs.length > 0 && !alreadyHidden.current) {
      const detalles = document.querySelectorAll('.blog_details')
      detalles.forEach((det) => (det.style.display = 'none'))

      const liElem = document.querySelectorAll('.specific_show_btn')
      liElem.forEach((li) => (li.style.display = 'none'))

      alreadyHidden.current = true
      console.log('Blogs setted')
    }
  }, [blogs])

  /*  ---------------------------------------------  */

  const showingDetails = (blogID) => {
    const details = document.querySelector(`.blog_details[id="${blogID}"]`)
    const displayVal = details.style.display
    details.style.display = displayVal === 'none' ? '' : 'none'

    if (userLoged.name === details.lastChild.lastChild.textContent) {
      const elemento = document.querySelector(
        `li[id="${blogID}"] .btn_container .specific_show_btn`,
      )
      const elemDisplay = elemento.style.display
      elemento.style.display = elemDisplay === 'none' ? '' : 'none'
    }
  }

  const onDltClick = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(id)
    } else console.log('Blog deletion cancelled')
  }

  const onLikeClick = (id) => {
    const blogToLike = blogs.find((blog) => blog.id === id)
    const likedBlog = {
      title: blogToLike.title,
      author: blogToLike.author,
      url: blogToLike.url,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    }
    likeBlog({ id, likedBlog })
  }

  const onUpdClick = (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id)
    const form = document.querySelector('#frm_blog')
    updatingBlog(blogToUpdate)

    if (blogFormRef.current.displayVal === 'none')
      blogFormRef.current.toggleVisibility()

    if (blogToUpdate) {
      form.title.value = blogToUpdate.title
      form.author.value = blogToUpdate.author
      form.url.value = blogToUpdate.url
      form.likes.value = blogToUpdate.likes || 0
      scrollTo(0, 0)
    } else {
      notiDispatch(setNoti(['Blog not found!', 'error']))
      console.error('Blog not found for update:', id)
    }
  }

  /*  ---------------------------------------------  */

  if (!blogs || blogs.length === 0 || !Array.isArray(blogs))
    return <div>No blogs available!</div>
  else {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <ul>
          {blogs.map((blog, i) => (
            <li key={blog.id} id={i}>
              <div className="blog_info">
                <strong>{blog.title}</strong>
                <div id={i} className="blog_details">
                  <p>
                    By {blog.author} - {blog.likes} likes
                  </p>
                  <p>
                    <a href={blog.url}>{blog.url}</a>
                  </p>
                  <p>
                    Uploaded by&nbsp;
                    {typeof blog.user === 'object'
                      ? blog.user.name
                      : users.find((val) => val.id === blog.user).name}
                  </p>
                </div>
              </div>

              <div className="btn_container">
                <div className="always_show_btn">
                  <button className="sdt_btn" onClick={() => showingDetails(i)}>
                    Show Details
                  </button>
                  <button
                    className="lks_btn"
                    onClick={() => onLikeClick(blog.id)}
                  >
                    Like
                  </button>
                </div>

                <div className="specific_show_btn">
                  <button
                    className="upd_btn"
                    onClick={() => onUpdClick(blog.id)}
                  >
                    Update
                  </button>
                  <button
                    className="dlt_btn"
                    onClick={() => onDltClick(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default List
