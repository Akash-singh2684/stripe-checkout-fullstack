import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const SidebarCart = () => {
  const { cart, addToCart, removeFromCart, totalPrice, clearCart } = useCart();

  const navigate = useNavigate();

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.heading}>Cart</h2>
      {cart.length === 0 ? (
        <p style={styles.empty}>Your cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={styles.info}>
                <div style={styles.name}>{item.name}</div>
                <div style={styles.qty}>Qty: {item.quantity}</div>
                <div style={styles.price}>₹{item.price * item.quantity}</div>
              </div>
            </div>
          ))}

          <div style={styles.total}>Total: <strong>₹{totalPrice}</strong></div>

          <button style={styles.checkoutBtn} onClick={() => navigate('/cart')}>Go to Cart</button>
          <button style={styles.clearBtn} onClick={clearCart}>Clear</button>
        </div>
      )}
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '320px',
    padding: '1rem',
    background: 'var(--bg-primary)',
    borderLeft: '1px solid var(--border)',
    height: '100%',
    position: 'sticky',
    top: '1rem',
    alignSelf: 'start',
    borderRadius: '8px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '1rem',
  },
  empty: {
    color: 'var(--text-secondary)'
  },
  item: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '0.75rem',
    alignItems: 'center',
  },
  image: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  info: {
    flex: 1,
  },
  name: {
    color: 'var(--text-primary)',
    fontWeight: '600',
    fontSize: '0.95rem'
  },
  qty: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem'
  },
  price: {
    color: 'var(--text-primary)',
    fontWeight: '700'
  },
  total: {
    marginTop: '1rem',
    fontSize: '1.1rem',
    color: 'var(--text-primary)'
  },
  checkoutBtn: {
    width: '100%',
    marginTop: '0.75rem',
    background: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '700',
    cursor: 'pointer'
  },
  clearBtn: {
    width: '100%',
    marginTop: '0.5rem',
    background: 'transparent',
    color: '#EF4444',
    border: '1px solid rgba(239,68,68,0.25)',
    padding: '0.5rem',
    borderRadius: '8px',
    cursor: 'pointer'
  }
}

export default SidebarCart;
