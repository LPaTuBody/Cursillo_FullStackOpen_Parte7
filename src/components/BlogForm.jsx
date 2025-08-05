import { useDispatch } from 'react-redux'
import { addNoti } from '../reducers/notifications'

const Form = ({ handleSubmit, rstUpd, blogFormRef }) => {
  if (typeof handleSubmit !== 'function') throw new Error('handleSubmit must be a function')

  const dispatch = useDispatch()

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
    } else if (!newBlog.title && !newBlog.author && !newBlog.url) {
      dispatch(addNoti(['All fields are required!', 'error']))
      console.log('All fields are required!')
      return
    } else handleSubmit(newBlog)
  }

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