import { Box, Button, TextField } from '@mui/material';
import { frmDiv } from '../styles/styles';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { handleLogin } from "../reducers/loged-user";

const loginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPswd] = useState('');

  const handleNewUser = () => {
    console.log('Función en proceso...');
    return
  }

  const handleSubmit = () => {
    const form = document.querySelector('form');
    if (!username) return form[0].focus()
    if (!password) return form[1].focus()

    dispatch(handleLogin({ username, password }))
  }


  return (
    <div>
      <Box component={'form'} onSubmit={(e) => e.preventDefault()}>
        <Box>
          <label htmlFor="username">Username</label>
          <TextField
            fullWidth
            type="text"
            id="username"
            name="username"
            required={true}
            autoFocus={true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>

        <Box sx={frmDiv}>
          <label htmlFor="pswd">Password</label>
          <TextField
            fullWidth
            type="password"
            id="pswd"
            name="password"
            required={true}
            value={password}
            onChange={(e) => setPswd(e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button type="submit" onClick={handleSubmit}>
            Log-in
          </Button>
          <Button color='secondary' onClick={handleNewUser}>
            New in the app?
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default loginForm
