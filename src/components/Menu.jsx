import { Link } from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 10
  }
  return (
    <div style={{ marginTop: '5px' }}>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

export default Menu