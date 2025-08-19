import {
  Box,
  IconButton,
  Typography,
  Link as MuiLink,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { salute } from '../styles/styles'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { handleLogout } from '../reducers/loged-user'
import { notUpdating } from '../reducers/is-updating'


const Header = () => {
  const user = useSelector(state => state.logedUser)
  const dispatch = useDispatch()

  const handleUserLogout = () => {
    dispatch(handleLogout())
    dispatch(notUpdating())
  }

  // estilos
  const spanStyle = {
    fontStyle: 'italic',
    fontWeight: 900,
    color: 'primary.main',
    cursor: 'pointer',
  }

  const menuLink = {
    textDecoration: 'none',
    fontSize: '1.1em',
    color: '#333',
    fontWeight: 600,
    padding: '5px 8px',
    borderRadius: '20px',
    transition: 'all 0.1s ease',
    '&:visited': { color: '#333' },
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
  }


  return (
    <Box component={'header'}>
      <Box sx={{
        backgroundColor: 'whitesmoke',
        padding: '20px 10%',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        width: '100%'
      }}>
        <Box sx={{
          fontSize: '1.6em',
          fontWeight: 700,
          textTransform: 'capitalize',
          color: '#333',
          '&.MuiButtonBase-root:hover': {
            backgroundColor: 'transparent',
          }
        }}>
          <Link to={'/'} style={{
            textDecoration: 'none',
            fontSize: '1.1em',
            color: '#333',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            <Box component={'span'} sx={spanStyle}>Your</Box>Blogs
          </Link>
        </Box>

        <Box component={'nav'} sx={{
          backgroundColor: 'whitesmoke',
          display: 'flex',
          gap: '30px',
          alignItems: 'center'
        }}>
          <MuiLink component={Link} to={'/blogs'} sx={menuLink}>
            Blogs
          </MuiLink>
          <MuiLink component={Link} to={'/users'} sx={menuLink}>
            Users
          </MuiLink>
          <IconButton
            onClick={() => handleUserLogout()}
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '1.1em',
              cursor: 'pointer',
              color: '#333',
              '& svg': { cursor: 'pointer' }
            }}
          ><FontAwesomeIcon icon="fa-arrow-right-from-bracket" /></IconButton>
        </Box>
      </Box>

      <Box sx={salute}>
        <Box sx={{ fontSize: '1.1em', fontWeight: 700, mb: '5px' }}>
          Hello <em>{user.name}</em>!
        </Box>
        <Typography variant='h1'>Want to save a blog?</Typography>
      </Box>
    </Box>
  )
}

export default Header