function Cart({ cart, removeFromCart, loggedInUser, setPage }) {

  const total = cart.reduce(
    (sum, cake) => sum + cake.price,
    0
  )

  function handleCheckout() {
    if (!loggedInUser) {
      setPage('login')
      return
    }

  setPage('checkout')
  }

  return (
    <section className="cart-page">

      <h1>Your Cart</h1>

      {cart.length === 0 ? (

        <p>Your cart is currently empty.</p>

      ) : (

        <>

          <div className="cart-items">

            {cart.map((cake, index) => (

              <div className="cart-item" key={index}>

                <div className="cart-item-image">
                  {cake.image}
                </div>

                <div className="cart-item-info">
                  <h3>{cake.name}</h3>
                  <p>₹{cake.price}</p>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <div className="cart-total">

            <h2>
              Total: ₹{total}
            </h2>

            <button onClick={handleCheckout}>
              Proceed to Checkout
            </button>

          </div>

        </>

      )}

    </section>
  )
}

export default Cart