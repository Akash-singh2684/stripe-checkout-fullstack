import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaCheckCircle, FaShoppingBag } from 'react-icons/fa';

const SuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <FaCheckCircle style={styles.checkmark} />
        </div>
        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.message}>Your order has been confirmed</p>
        <p style={styles.submessage}>You will receive a confirmation email shortly</p>
        
        <button 
          onClick={() => navigate('/')} 
          style={styles.button}
        >
          <FaShoppingBag style={{ marginRight: '10px' }} />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '3rem 2rem',
    textAlign: 'center',
  },
  card: {
    background: 'var(--bg-primary)',
    borderRadius: '12px',
    padding: '3rem 2rem',
    border: '1px solid var(--border)',
  },
  iconWrapper: {
    marginBottom: '1.5rem',
  },
  checkmark: {
    fontSize: '80px',
    color: '#22C55E',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
    fontWeight: '500',
    marginBottom: '0.5rem',
  },
  submessage: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
  },
  confetti: {
    display: 'none',
  },
  confettiPiece: {
    display: 'none',
  },
  button: {
  background: 'var(--gradient-button)',
  color: 'var(--bg-primary)',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default SuccessPage;
