import { Box, Button } from '@mui/material'
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { useMatch } from 'react-router-dom'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const match = useMatch('/');
  useEffect(() => { setVisible(match) }, [match]);

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => ({
    toggleVisibility,
    displayVal: showWhenVisible.display,
  }))

  const btnShowStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    margin: '0 auto',
    display: 'block',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1em',
    color: 'black'
  }

  return (
    <Box>
      <Box style={hideWhenVisible}>
        <Button variant='text' sx={btnShowStyle} onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>
      <Box style={showWhenVisible} id="show_when_visible">
        {props.children}
      </Box>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
