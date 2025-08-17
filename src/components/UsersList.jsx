import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@mui/material';
import { Link } from 'react-router-dom';


export const User = ({ user }) => {
  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </>
  )
};

export const UsersList = ({ users }) => (
  <div>
    <h2>Users</h2>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>blogs created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow>
            <TableCell>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </TableCell>
            <TableCell>{user.blogs.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);