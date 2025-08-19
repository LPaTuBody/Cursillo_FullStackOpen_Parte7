import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route, Routes, useMatch, useLocation, useNavigate
} from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { pagBox, salute } from './styles/styles';

import { setUsers } from './reducers/users';
import { checkUserLoged } from './reducers/loged-user';
import { setBlogs } from './reducers/blogs';

import Header from './components/Header';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { UsersList, User } from './components/UsersList';


function App() {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userLoged = useSelector(state => state.logedUser);
  const users = useSelector(state => state.user);
  const blogs = useSelector(state => state.blog);

  useEffect(() => {
    dispatch(setBlogs())
    dispatch(setUsers())
    navigate('/')
  }, []);

  useEffect(() => {
    dispatch(checkUserLoged())
  }, [location.pathname])

  const findUser = (id) => users.find(u => u.id === id);
  const findBlog = (id) => blogs.find(b => b.id === id);

  const matchUser = useMatch('/users/:id');
  const user = matchUser ? findUser(matchUser.params.id) : null;

  const matchBlog = useMatch('/blogs/:id');
  const blog = matchBlog ? findBlog(matchBlog.params.id) : null;

  /* --------------------------------------------------- */


  // Sin usuario logueado
  if (!userLoged) return (
    <Box sx={{ mt: '20vh' }}>
      <Box sx={salute}>
        <Typography variant='h1'>Log-in to App</Typography>
      </Box>
      <Box sx={{...pagBox, width: '50%'}}>
        <LoginForm />
      </Box>
      <Notification />
    </Box>
  )

  // Con usuario logueado
  return (
    <>
      <Header />

      <Box sx={pagBox}>
        <Togglable buttonLabel={'Yes, I want to!'} ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      </Box>

      <Routes>
        <Route path={'/blogs'} element={<BlogList blogs={blogs} />} />
        <Route path={'/users'} element={<UsersList users={users} />} />
        <Route path={'/users/:id'} element={<User user={user} />} />
        <Route path={'/blogs/:id'} element={
          <Blog blog={blog} users={users} userLoged={userLoged} />
        } />
      </Routes>

      <Notification />
    </>
  )
}

export default App