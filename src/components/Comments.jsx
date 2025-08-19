import {
  Box,
  Typography,
  Link as MuiLink,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField
} from '@mui/material';
import { useDispatch } from "react-redux"
import { commentBlog } from "../reducers/blogs"

const Comments = ({ blog }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog.id, e.target.comment.value));
    e.target.comment.value = '';
  }

  return (
    <Box>
      <Typography variant='h3'>Comments</Typography>
      <Box component={'form'} onSubmit={handleSubmit} sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'right',
        gap: 1.5,
        my: 2
      }}>
        <TextField type="text" name="comment" id="comment" fullWidth />
        <Button type="submit">Add comment</Button>
      </Box>

      <List>
        {blog.comments.map((comment, i) => (
          <ListItem key={i} sx={{
            borderLeft: i % 2 !== 0
              ? '1px solid #c681f2ff'
              : '1px solid #ccc',
          }}>
            <ListItemText>{comment}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Comments