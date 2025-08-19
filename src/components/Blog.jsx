import {
  Box,
  Typography,
  Link as MuiLink,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { pagBox } from '../styles/styles';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBlog, likeBlog } from '../reducers/blogs';
import { isUpdating } from '../reducers/is-updating';
import Comments from './Comments';


const Blog = ({ blog, users, userLoged }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const widerScreen = useMediaQuery(theme.breakpoints.up('lg'))

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


  if (!blog) return (<Box sx={pagBox}>Loading blog...</Box>)
  else {
    const upBy = typeof blog.user === 'object'
      ? blog.user.name
      : users.find((val) => val.id === blog.user).name;

    const showBtns = (userLoged.name === upBy);

    return (
      <Box sx={{
        display: 'flex',
        flexDirection: widerScreen ? 'row' : 'column',
        justifyContent: 'space-between',
        width: '80%',
        margin: '0 auto'
      }}>
        <Box sx={{
          ...pagBox,
          m: '30px 0',
          width: widerScreen ? '40%' : '100%',
          height: 'fit-content'
        }}>
          <Typography variant='h2' mb={2} >{blog.title}</Typography>

          <Box sx={{
            marginTop: '5px',
            lineHeight: 2,
          }}>
            <Typography variant='body1'>
              By {blog.author} - {blog.likes} likes
            </Typography>
            <MuiLink href={blog.url}>{blog.url}</MuiLink>
            <Typography variant='body2'>
              Uploaded by {upBy}
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: widerScreen ? '30px' : '15px',
            gap: 1,
          }}>
            <Button onClick={() => onLikeClick()}>Like</Button>

            <Button
              onClick={() => onUpdClick()}
              sx={{ display: showBtns ? '' : 'none' }}
            >Update</Button>

            <Button
              color='error'
              onClick={() => dispatch(deleteBlog(blog.id))}
              sx={{ display: showBtns ? '' : 'none' }}
            >Delete</Button>
          </Box>
        </Box>

        <Box sx={{
          ...pagBox,
          m: '30px 0',
          width: widerScreen ? '55%' : '100%',
        }}>
          <Comments blog={blog} />
        </Box>
      </Box>
    )
  }
}

export default Blog