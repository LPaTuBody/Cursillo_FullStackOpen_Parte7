import { useNavigate } from 'react-router-dom'
import { useNotiDispatch, setNoti } from '../../NotificationContext'
import { useField } from '../../hooks'

const CreateNew = (props) => {
  const navigate = useNavigate()
  const dispatch = useNotiDispatch()
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.atributos.value,
      author: author.atributos.value,
      info: info.atributos.value,
      votes: 0
    })
    navigate('/')
    dispatch(setNoti(`A new anecdote "${content.atributos.value}" created!`))
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div className='content_containers'>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Content</label>
          <input {...content.atributos} />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input {...author.atributos} />
        </div>
        <div>
          <label htmlFor="info">Url for more info</label>
          <input {...info.atributos} />
        </div>
        <button type='submit' style={{ marginRight: '10px' }}>create</button>
        <button type='reset' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew