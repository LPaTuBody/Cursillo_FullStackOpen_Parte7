import { Box, Button } from '@mui/material'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { handleLogout } from '../reducers/loged-user'
import { notUpdating } from '../reducers/is-updating'

const WelcomeMsg = styled.p`
  font-size: 1.1em;
  font-weight: 700;
  margin-bottom: 5px;
`
const UserName = styled.span`
  font-style: italic;
`
/*
const LogoutContainer = styled.div`
  position: fixed;
  bottom: 1.2%;
  right: 2%;
`
const LogoutBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #333;
`
const NavBar = styled.nav`
  background-color: ;
`
*/

const Header = () => {
  const user = useSelector(state => state.logedUser)
  const dispatch = useDispatch()

  const handleUserLogout = () => {
    dispatch(handleLogout())
    dispatch(notUpdating())
  }

  const linkStyle = {
    textDecoration: 'none',
    fontSize: '1.1em',
    color: '#333',
    fontWeight: 600,
  }

  const spanStyle = {
    fontStyle: 'italic',
    fontWeight: 900,
    color: '#b849fc',
  }

  return (
    <header>
      <div className="menu">
        <Box sx={{
          fontSize: '1.6em',
          fontWeight: 700,
          textTransform: 'capitalize',
          color: '#333',
          '&.MuiButtonBase-root:hover': {
            backgroundColor: 'transparent',
          }
        }}>
          <Link to={'/'} style={linkStyle}>
            <Box component={'span'} sx={spanStyle}>Your</Box>Blogs
          </Link>
        </Box>
        <nav>
          <Link to={'/blogs'}>Blogs</Link>
          <Link to={'/users'}>Users</Link>
          <button className="logout" onClick={() => handleUserLogout()}>
            <FontAwesomeIcon icon="fa-arrow-right-from-bracket" />
          </button>
        </nav>
      </div>
      <div className="salute">
        <WelcomeMsg className="welcome_msg">
          Hello <UserName>{user.name}</UserName>!
        </WelcomeMsg>
        <h1>Want to save a blog?</h1>
      </div>
    </header>
  )
}

export default Header