import {
  Box,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import { frmDiv } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, updateBlog } from '../reducers/blogs'
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

    if (!newBlog.title && !newBlog.author && !newBlog.url) {
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

  const handleNvm = () => {
    blogFormRef.current.toggleVisibility();
    document.querySelector('form').reset();
    dispatch(notUpdating());
  }

  return (
    <Box>
      <Typography variant='h2'>Add a Blog</Typography>

      <Box component={'form'} onSubmit={handleBlogSubmit} id='frm_blog'>
        <Box sx={frmDiv}>
          <label htmlFor="title">Title</label>
          <TextField type="text" id="title" name="title" fullWidth />
        </Box>
        <Box sx={frmDiv}>
          <label htmlFor="author">Author</label>
          <TextField type="text" id="author" name="author" fullWidth />
        </Box>
        <Box sx={frmDiv}>
          <label htmlFor="url">URL</label>
          <TextField type="text" id="url" name="url" fullWidth />
        </Box>
        <Box sx={frmDiv}>
          <label htmlFor="likes">Likes</label>
          <TextField type="number" id="likes" name="likes" fullWidth />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            type="submit"
            data-testid="submit_btn"
          >Save Blog</Button>

          <Button
            type="reset"
            color='error'
            onClick={() => dispatch(notUpdating())}
          >Reset</Button>

          <Button
            color='secondary'
            onClick={handleNvm}
            sx={{ ml: 'auto' }}
          >Nevermind</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Form