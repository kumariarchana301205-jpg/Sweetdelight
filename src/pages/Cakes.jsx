import CakeCard from '../components/CakeCard'

function Cakes({ addToCart }) {

  const cakes = [
    {
      id: 1,
      name: 'Chocolate Truffle',
      description: 'Rich chocolate cake with creamy chocolate ganache.',
      price: 599,
      image: '🍫'
    },
    {
      id: 2,
      name: 'Red Velvet',
      description: 'Soft red velvet cake with delicious cream cheese frosting.',
      price: 699,
      image: '🍰'
    },
    {
      id: 3,
      name: 'Strawberry Delight',
      description: 'Fresh strawberry cake with smooth whipped cream.',
      price: 649,
      image: '🍓'
    },
    {
      id: 4,
      name: 'Black Forest',
      description: 'Classic chocolate cake with cherries and fresh cream.',
      price: 549,
      image: '🍒'
    }
  ]

  return (
    <section className="cakes-section">

      <h2>Popular Cakes</h2>

      <p className="section-subtitle">
        Our customers' favourite treats
      </p>

      <div className="cake-grid">

        {cakes.map((cake) => (
          <CakeCard
            key={cake.id}
            cake={cake}
            addToCart={addToCart}
          />
        ))}

      </div>

    </section>
  )
}

export default Cakes