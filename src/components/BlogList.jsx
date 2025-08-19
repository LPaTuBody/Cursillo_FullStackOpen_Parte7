import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import { pagBox } from '../styles/styles';


const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return (
    <Box sx={pagBox}>
      <Typography variant='h2'>Blog List</Typography>

      {!blogs || blogs.length === 0 || !Array.isArray(blogs) ? (
        <Box sx={{ mt: 2 }}>No blogs available!</Box>
      ) : (
        <Box>
          <List>
            {sortedBlogs.map((blog, i) => (
              <ListItem
                key={blog.id}
                id={i}
                divider={true}
                sx={{
                  p: '15px 10px',
                  cursor: 'default',
                  '&.MuiListItem-root:last-child': {
                    borderBottom: 'none'
                  }
                }}
                component={Link}
                to={`/blogs/${blog.id}`}
              >
                <ListItemText sx={{
                  '& .MuiTypography-root': {
                    cursor: 'pointer',
                    color: 'primary.main',
                    fontWeight: 600,
                    transition: 'all 0.1s ease',
                  },
                  '& .MuiTypography-root:hover': {
                    color: 'primary.dark',
                  },
                }}>{blog.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default BlogList