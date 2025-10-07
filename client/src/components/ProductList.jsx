import React from 'react';
import { products } from '../mockData';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const { addToCart } = useCart();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Product List</h1>
      </div>
      <div style={styles.grid}>
            {products.filter(p => p.price < 1000).slice(0, 5).map((product) => (
              <div key={product.id} className="product-card" style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <div style={styles.cardContent}>
              <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.price}>₹{product.price}</p>
              <button 
                onClick={() => addToCart(product)} 
                style={styles.button}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#d7d2cc',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'var(--bg-primary)',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(215,210,204,0.12)',
  },
  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '1rem',
  },
  productName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
    color: '#d7d2cc',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#d7d2cc',
    margin: '0.5rem 0 1rem 0',
  },
  button: {
    width: '100%',
    background: '#d7d2cc',
    color: '#304352',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
};

export default ProductList;
