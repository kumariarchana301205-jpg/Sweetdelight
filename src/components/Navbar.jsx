function Navbar({
  setPage,
  cart,
  loggedInUser,
  setLoggedInUser
}) {

  function handleLogout() {
    localStorage.removeItem('loggedInUser')
    setLoggedInUser(null)
    setPage('home')
  }

  return (
    <nav className="navbar">

      <div
        className="logo"
        onClick={() => setPage('home')}
      >
        Sweet<span>Delights</span>
      </div>

      <div className="nav-links">

        <button onClick={() => setPage('home')}>
          Home
        </button>

        <button onClick={() => setPage('cakes')}>
          Cakes
        </button>

        <button onClick={() => setPage('about')}>
          About
        </button>

        <button onClick={() => setPage('cart')}>
          Cart ({cart.length})
        </button>
<button onClick={() => setPage('orders')}>
  My Orders
</button>
        {loggedInUser ? (
          <>
            <span className="welcome-user">
              Hi, {loggedInUser.name}
            </span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>
            Login
          </button>
        )}

      </div>

    </nav>
  )
}

export default Navbar