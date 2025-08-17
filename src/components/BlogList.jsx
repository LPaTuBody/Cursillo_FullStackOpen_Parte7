import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addNoti } from '../reducers/notifications'
import { deleteBlog, likeBlog } from '../reducers/blogs'
import { notUpdating, isUpdating } from '../reducers/is-updating'

export const Blog = ({ blog, users, userLoged }) => {
  const dispatch = useDispatch();
  const alreadySetted = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (blog && !alreadySetted.current) {
      const upBy = document.querySelector(`.blog_details`).lastChild.lastChild;
      const ssBtn = document.querySelector(
        `.btn_container .specific_show_btn`
      );

      userLoged.name === upBy.textContent
        ? ssBtn.style.display = ''
        : ssBtn.style.display = 'none';

      alreadySetted.current = true
      console.log('Blog setted')
    }
  }, [blog, alreadySetted.current])


  const onLikeClick = () => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    dispatch(likeBlog(blog.id, likedBlog))
  }

  const onUpdClick = () => {
    navigate('/');
    const form = document.querySelector('#frm_blog');
    dispatch(isUpdating(blog));

    form.title.value = blog.title
    form.author.value = blog.author
    form.url.value = blog.url
    form.likes.value = blog.likes
    scrollTo(0, 0);
  }

  /* ----------------- ----------------- ----------------- */

  return !blog ? (<>Loading blog...</>) :
    (
      <>
        <h2>{blog.title}</h2>
        <div className="blog_details">
          <p>By {blog.author} - {blog.likes} likes</p>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>
            Uploaded by&nbsp;
            {typeof blog.user === 'object'
              ? blog.user.name
              : users.find((val) => val.id === blog.user).name}
          </p>
        </div>
        <div className="btn_container">
          <div className="always_show_btn">
            <button
              className="lks_btn"
              onClick={() => onLikeClick()}
            >Like</button>
          </div>

          <div className="specific_show_btn">
            <button
              className="upd_btn"
              onClick={() => onUpdClick()}
            >Update</button>
            <button
              className="dlt_btn"
              onClick={() => dispatch(deleteBlog(blog.id))}
            >Delete</button>
          </div>
        </div>
      </>
    )
}

export const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return (
    <div className="list_container">
      <h2>Blog List</h2>

      {!blogs || blogs.length === 0 || !Array.isArray(blogs) ? (
        <div>No blogs available!</div>
      ) : (
        <div>
          <ul>
            {sortedBlogs.map((blog, i) => (
              <li key={blog.id} id={i}>
                <Link to={`/blogs/${blog.id}`}>
                  <strong>{blog.title}</strong>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
