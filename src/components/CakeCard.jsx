function CakeCard({ cake, addToCart }) {
  return (
    <div className="cake-card">

      <div className="cake-image">
        {cake.image}
      </div>

      <div className="cake-info">

        <h3>{cake.name}</h3>

        <p>{cake.description}</p>

        <div className="cake-bottom">

          <span>₹{cake.price}</span>

          <button onClick={() => addToCart(cake)}>
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  )
}

export default CakeCard