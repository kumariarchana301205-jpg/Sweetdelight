import { useState } from 'react'

function Checkout({ cart, loggedInUser, setPage, setCart }) {

  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')

  const total = cart.reduce(
    (sum, cake) => sum + cake.price,
    0
  )

  function handleOrder() {

    if (!phone || !address) {
      setMessage('Please enter your phone number and delivery address.')
      return
    }

    const orders = JSON.parse(
      localStorage.getItem('orders')
    ) || []

    const newOrder = {
      id: Date.now(),
      customerName: loggedInUser.name,
      email: loggedInUser.email,
      phone: phone,
      address: address,
      items: cart,
      total: total,
      date: new Date().toLocaleString()
    }

    orders.push(newOrder)

   localStorage.setItem(
  'orders',
  JSON.stringify(orders)
)

setCart([])

setMessage('Order placed successfully! 🎉')
  }

  return (
    <section className="checkout-page">

      <div className="checkout-box">

        <h1>Checkout</h1>

        <p>Complete your order from SweetDelights</p>

        <div className="customer-info">

          <h3>Customer Details</h3>

          <p>
            <strong>Name:</strong> {loggedInUser?.name}
          </p>

          <p>
            <strong>Email:</strong> {loggedInUser?.email}
          </p>

        </div>

        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows="4"
        />

        <div className="checkout-total">
          <h2>Total: ₹{total}</h2>
        </div>

        <button onClick={handleOrder}>
          Place Order
        </button>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <button
          className="back-cart-button"
          onClick={() => setPage('cart')}
        >
          Back to Cart
        </button>

      </div>

    </section>
  )
}

export default Checkout