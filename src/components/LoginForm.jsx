const loginForm = ({ handleLogin }) => {
  const handleSubmitLogin = (e) => {
    e.preventDefault()
    if (e.nativeEvent.submitter.className === 'new_user')
      console.log('Función en proceso...')
    else {
      const frmUsername = e.target[0].value
      const frmPswd = e.target[1].value

      if (!frmUsername) return e.target[0].focus()
      else if (!frmPswd) return e.target[1].focus()

      const userObj = {
        username: frmUsername,
        password: frmPswd,
      }

      handleLogin(userObj)
    }
  }

  return (
    <div>
      <form id="login_form" onSubmit={handleSubmitLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="inp_form"
          />
        </div>
        <div>
          <label htmlFor="pswd">Password</label>
          <input
            type="password"
            id="pswd"
            name="password"
            className="inp_form"
          />
        </div>
        <button type="submit" className="login">
          Log-in
        </button>
        <button className="new_user">New in the app?</button>
      </form>
    </div>
  )
}

export default loginForm
