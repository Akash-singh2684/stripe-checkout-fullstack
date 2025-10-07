import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axiosInstance from '../utils/axios';
import { FaShoppingBag, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart, totalPrice } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleCheckout = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/checkout/create-checkout-session', {
        cartItems: cart,
        email: email
      });

      if (response.data.url) {
        // Redirect to Stripe checkout
        window.location.href = response.data.url;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Checkout failed. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyCart}>
          <FaShoppingBag style={styles.emptyIcon} />
          <h1 style={styles.emptyTitle}>Your Cart is Empty</h1>
          <p style={styles.emptySubtitle}>Add some items to get started</p>
          <a href="/" style={styles.shopBtn}>Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>
      <div style={styles.cartContent}>
        {cart.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <div style={styles.imageWrapper}>
              <img src={item.image} alt={item.name} style={styles.image} />
            </div>
            <div style={styles.itemDetails}>
              <h3 style={styles.itemName}>{item.name}</h3>
              <p style={styles.price}>₹{item.price}</p>
            </div>
            <div style={styles.quantityControl}>
              <button 
                onClick={() => removeFromCart(item.id)} 
                style={styles.quantityBtn}
              >
                <FaMinus />
              </button>
              <span style={styles.quantity}>{item.quantity}</span>
              <button 
                onClick={() => addToCart(item)} 
                style={styles.quantityBtn}
              >
                <FaPlus />
              </button>
            </div>
            <div style={styles.itemTotal}>
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.checkoutSection}>
        <div style={styles.totalSection}>
          <h2 style={styles.totalText}>Total: <span style={styles.totalAmount}>₹{totalPrice}</span></h2>
        </div>
        
        <div style={styles.emailSection}>
          <label htmlFor="email" style={styles.label}>Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            style={styles.input}
            required
          />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button 
          onClick={handleCheckout} 
          style={styles.checkoutBtn}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Proceed to Checkout'}
        </button>

        <button 
          onClick={clearCart} 
          style={styles.clearBtn}
        >
          <FaTrashAlt style={{ marginRight: '8px' }} />
          Clear Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#d7d2cc',
    marginBottom: '2rem',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: '#304352',
    borderRadius: '12px',
    border: '1px solid rgba(215,210,204,0.12)',
  },
  emptyIcon: {
    fontSize: '4rem',
    color: '#d7d2cc',
    marginBottom: '1rem',
  },
  emptyTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#d7d2cc',
    marginBottom: '0.5rem',
  },
  emptySubtitle: {
    fontSize: '1rem',
    color: '#d7d2cc',
    marginBottom: '1.5rem',
  },
  shopBtn: {
    display: 'inline-block',
    background: '#d7d2cc',
    color: '#304352',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
  },
  cartContent: {
    marginBottom: '2rem',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#304352',
    borderRadius: '12px',
    marginBottom: '1rem',
    border: '1px solid rgba(215,210,204,0.12)',
  },
  imageWrapper: {
    borderRadius: '8px',
    overflow: 'hidden',
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#d7d2cc',
    marginBottom: '0.25rem',
  },
  price: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#d7d2cc',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  quantityBtn: {
    width: '32px',
    height: '32px',
    border: '1px solid rgba(215,210,204,0.12)',
    borderRadius: '6px',
    background: 'rgba(0,0,0,0.06)',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: '#d7d2cc',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    padding: '0 0.75rem',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#E5E7EB',
    minWidth: '30px',
    textAlign: 'center',
  },
  itemTotal: {
    fontWeight: '700',
    fontSize: '1.2rem',
    color: '#d7d2cc',
    minWidth: '80px',
    textAlign: 'right',
  },
  checkoutSection: {
    background: '#304352',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid rgba(215,210,204,0.12)',
  },
  totalSection: {
    marginBottom: '1.5rem',
    padding: '1rem',
    background: 'rgba(0,0,0,0.06)',
    borderRadius: '8px',
  },
  totalText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#d7d2cc',
  },
  totalAmount: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#d7d2cc',
  },
  emailSection: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#d7d2cc',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #27272A',
    borderRadius: '8px',
    fontSize: '1rem',
    background: 'rgba(0,0,0,0.06)',
    color: '#d7d2cc',
  },
  error: {
    background: 'rgba(239, 68, 68, 0.08)',
    color: '#EF4444',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontWeight: '500',
    fontSize: '0.9rem',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  checkoutBtn: {
    width: '100%',
    background: '#d7d2cc',
    color: '#304352',
    border: 'none',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '0.75rem',
  },
  clearBtn: {
    width: '100%',
    background: 'transparent',
    color: '#EF4444',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default CartPage;
