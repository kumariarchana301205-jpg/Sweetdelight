import { useState } from 'react'

function Register({ setPage }) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleRegister() {

  if (!name || !email || !password || !confirmPassword) {
    setMessage('Please fill in all the fields.')
    return
  }

  if (password !== confirmPassword) {
    setMessage('Passwords do not match.')
    return
  }

  const users = JSON.parse(localStorage.getItem('users')) || []

  const existingUser = users.find(
    (user) => user.email === email
  )

  if (existingUser) {
    setMessage('An account with this email already exists.')
    return
  }

  users.push({
    name: name,
    email: email,
    password: password
  })

  localStorage.setItem('users', JSON.stringify(users))

  setMessage('Account created successfully! 🎉')
}

  return (
    <section className="login-page">

      <div className="login-box">

        <h1>Create Account</h1>

        <p>Join the SweetDelights family</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Register
        </button>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <p
          className="register-text"
          onClick={() => setPage('login')}
        >
          Already have an account? Login
        </p>

      </div>

    </section>
  )
}

export default Register