import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../mockData';
import ProductList from '../components/ProductList';

const CategoryPage = () => {
  const { category } = useParams();
  const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div style={styles.grid}>
        {filtered.map(product => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.price}>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
  title: { fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' },
  card: { background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', textAlign: 'center' },
  image: { width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' },
  name: { color: 'var(--text-primary)', marginTop: '0.5rem' },
  price: { color: 'var(--text-primary)', fontWeight: '700' }
};

export default CategoryPage;
