import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useMatch } from 'react-router-dom';

import { setUsers } from './reducers/users';
import { checkUserLoged } from './reducers/loged-user';
import { setBlogs } from './reducers/blogs';

import Header from './components/Header';
import { BlogList, Blog } from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { UsersList, User } from './components/UsersList';


function App() {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const userLoged = useSelector(state => state.logedUser);
  const users = useSelector(state => state.user);
  const blogs = useSelector(state => state.blog);

  useEffect(() => {
    dispatch(setBlogs())
    dispatch(setUsers())
    dispatch(checkUserLoged())
  }, []);

  const findUser = (id) => users.find(u => u.id === id);
  const findBlog = (id) => blogs.find(b => b.id === id);

  const matchUser = useMatch('/users/:id');
  const user = matchUser ? findUser(matchUser.params.id) : null;
  // console.log(user)

  const matchBlog = useMatch('/blogs/:id');
  const blog = matchBlog ? findBlog(matchBlog.params.id) : null;
  // console.log(blog)

  /* --------------------------------------------------- */


  // Sin usuario logueado
  if (!userLoged) return (
    <>
      <div className="salute">
        <h1>Log-in to App</h1>
      </div>
      <div className="form_container">
        <LoginForm />
      </div>
      <Notification />
    </>
  )

  // Con usuario logueado
  return (
    <>
      <Header />

      <div className="form_container">
        <Togglable buttonLabel={'Yes, I want to!'} ref={blogFormRef}>
          <h2>Add a Blog</h2>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      </div>

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