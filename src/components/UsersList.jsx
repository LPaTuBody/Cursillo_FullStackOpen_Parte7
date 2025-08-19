import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Link as MuiLink,
  Typography,
  List,
  ListItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import { pagBox } from '../styles/styles';


export const User = ({ user }) => {
  return (
    <Box sx={pagBox}>
      <Typography variant='h2'>{user.name}</Typography>
      <Typography variant='h3' mt={3}>Added Blogs:</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </Box>
  )
};

export const UsersList = ({ users }) => (
  <Box sx={pagBox}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><Typography variant='h2'>Users</Typography></TableCell>
          <TableCell>Blogs created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, i) => (
          <TableRow key={user.id}>
            <TableCell>
              <MuiLink component={Link} to={`/users/${user.id}`}>
                {user.name}
              </MuiLink>
            </TableCell>
            <TableCell>{user.blogs.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);