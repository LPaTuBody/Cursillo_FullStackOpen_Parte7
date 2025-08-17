import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogs'
import { addNoti } from '../reducers/notifications'
import { notUpdating } from '../reducers/is-updating'

const Form = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const edBlog = useSelector(state => state.isUpdating);

  const handleBlogSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const newBlog = {
      title: form.get('title').trim(),
      author: form.get('author') ? form.get('author').trim() : 'Unknown',
      url: form.get('url').trim(),
      likes: form.get('likes') ? form.get('likes') : 0,
    }

    if (e.nativeEvent.submitter.className === 'returning') {
      blogFormRef.current.toggleVisibility()
      e.target.reset()
    }
    else if (!newBlog.title && !newBlog.author && !newBlog.url) {
      dispatch(addNoti(['All fields are required!', 'error']))
      console.log('All fields are required!')
      return
    }
    else {
      if (edBlog) {
        dispatch(updateBlog(edBlog.id, newBlog))
        dispatch(notUpdating())
      } else dispatch(createBlog(newBlog))
    }
  }

  const rstUpd = () => dispatch(notUpdating());

  return (
    <div>
      <form id="frm_blog" onSubmit={handleBlogSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" className="inp_form" />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" name="author" className="inp_form" />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input type="text" id="url" name="url" className="inp_form" />
        </div>
        <div>
          <label htmlFor="url">Likes</label>
          <input type="number" id="likes" name="likes" className="inp_form" />
        </div>

        <div className="frm_btn_container">
          <button type="submit" data-testid="submit_btn">
            Save Blog
          </button>
          <button type="reset" className="reset_btn" onClick={rstUpd}>
            Reset
          </button>
          <button className="returning" onClick={rstUpd}>
            Nevermind
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form