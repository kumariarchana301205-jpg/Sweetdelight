function Orders({ loggedInUser }) {

  const allOrders = JSON.parse(
    localStorage.getItem('orders')
  ) || []

  const userOrders = allOrders.filter(
    (order) => order.email === loggedInUser?.email
  )

  return (
    <section className="orders-page">

      <h1>My Orders</h1>

      {userOrders.length === 0 ? (

        <p>You haven't placed any orders yet.</p>

      ) : (

        <div className="orders-list">

          {userOrders.map((order) => (

            <div className="order-card" key={order.id}>

              <h3>
                Order #{order.id}
              </h3>

              <p>
                <strong>Date:</strong> {order.date}
              </p>

              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>

              <h4>Items</h4>

              {order.items.map((cake, index) => (
                <p key={index}>
                  {cake.name} — ₹{cake.price}
                </p>
              ))}

              <p>
                <strong>Delivery Address:</strong>{' '}
                {order.address}
              </p>

            </div>

          ))}

        </div>

      )}

    </section>
  )
}

export default Orders