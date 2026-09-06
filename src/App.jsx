import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Cakes from './pages/Cakes'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import About from './pages/About'
import Footer from './components/Footer'

function App() {

  const [page, setPage] = useState('home')

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser')) || null
  )

  const [cart, setCart] = useState([])

  function addToCart(cake) {
    setCart([...cart, cake])
  }

  function removeFromCart(index) {
    const updatedCart = cart.filter(
      (_, i) => i !== index
    )

    setCart(updatedCart)
  }

  return (
    <>
      <Navbar
        setPage={setPage}
        cart={cart}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />

      {/* HOME PAGE */}
      {page === 'home' && (
        <>
          <Hero setPage={setPage} />
          <Cakes addToCart={addToCart} />
        </>
      )}

      {/* CAKES PAGE */}
      {page === 'cakes' && (
        <Cakes addToCart={addToCart} />
      )}

      {/* ABOUT PAGE */}
      {page === 'about' && (
        <About />
      )}

      {/* CART PAGE */}
      {page === 'cart' && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          loggedInUser={loggedInUser}
          setPage={setPage}
        />
      )}

      {/* CHECKOUT PAGE */}
      {page === 'checkout' && (
        <Checkout
          cart={cart}
          loggedInUser={loggedInUser}
          setPage={setPage}
          setCart={setCart}
        />
      )}

      {/* ORDERS PAGE */}
      {page === 'orders' && (
        <Orders
          loggedInUser={loggedInUser}
        />
      )}

      {/* LOGIN PAGE */}
      {page === 'login' && (
        <Login
          setPage={setPage}
          setLoggedInUser={setLoggedInUser}
        />
      )}

      {/* REGISTER PAGE */}
      {page === 'register' && (
        <Register
          setPage={setPage}
        />
      )}
{page !== 'login' && <Footer />}
    </>
   )
}

export default App