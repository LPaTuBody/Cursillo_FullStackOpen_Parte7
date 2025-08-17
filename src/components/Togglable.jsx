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

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="btn_show_frm" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} id="show_when_visible">
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
