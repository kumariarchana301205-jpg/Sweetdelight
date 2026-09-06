import { useState } from 'react'

function Login({ setPage, setLoggedInUser })  {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleLogin() {

  if (!email || !password) {
    setMessage('Please enter your email and password.')
    return
  }

  const users = JSON.parse(localStorage.getItem('users')) || []

  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  )

  if (!user) {
    setMessage('Invalid email or password.')
    return
  }

 localStorage.setItem(
  'loggedInUser',
  JSON.stringify(user)
)

setLoggedInUser(user)

setMessage(`Welcome back, ${user.name}! 🎉`)
}
  return (
    <section className="login-page">

      <div className="login-box">

        <h1>Welcome Back</h1>

        <p>Login to your SweetDelights account</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <p
  className="register-text"
  onClick={() => setPage('register')}
>
  Don't have an account? Register
</p>

      </div>

    </section>
  )
}

export default Login