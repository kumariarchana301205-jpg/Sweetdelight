function Hero({ setPage }) {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-small">
          Freshly Baked Happiness
        </p>

        <h1>
          Cakes Made For Your
          <span> Special Moments</span>
        </h1>

        <p className="hero-description">
          Discover delicious handcrafted cakes made with love,
          premium ingredients and unforgettable flavours.
        </p>

        <button
  className="shop-btn"
  onClick={() => setPage('cakes')}
>
  Shop Cakes
</button>

      </div>

      <div className="hero-image">
        <div className="cake-placeholder">
          🍰
        </div>
      </div>

    </section>
  )
}

export default Hero