import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotiDispatch, setNoti } from '../../NotificationContext'

const CreateNew = (props) => {
  const navigate = useNavigate()
  const dispatch = useNotiDispatch()
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    navigate('/')
    dispatch(setNoti(`A new anecdote "${content}" created!`))
  }

  return (
    <div className='content_containers'>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Content</label>
          <input id='content' name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input id='author' name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          <label htmlFor="info">Url for more info</label>
          <input id='info' name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew