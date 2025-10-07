import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.leftGroup}>
          <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>
            <span style={styles.gradientLetter}>S</span>
            <span style={styles.logoPlain}>h</span>
            <span style={styles.gradientLetter}>o</span>
            <span style={styles.gradientLetter}>p</span>
            <span style={styles.logoPlain}>A</span>
            <span style={styles.logoPlain}>t</span>
            <span style={styles.gradientLetter}>E</span>
            <span style={styles.logoPlain}>a</span>
             <span style={styles.gradientLetter}>s</span>
             <span style={styles.logoPlain}>e</span>
          </span>
          </Link>
          <div style={styles.categories}>
            <Link to="/category/tshirts" style={styles.catLink}>T-shirts</Link>
            <Link to="/category/pants" style={styles.catLink}>Pants</Link>
            <Link to="/category/shoes" style={styles.catLink}>Shoes</Link>
            <Link to="/category/hats" style={styles.catLink}>Hats</Link>
          </div>
        </div>
        <Link to="/cart" style={styles.cartLink}>
          <FaShoppingCart style={styles.cartIcon} />
          <span style={styles.cartText}>Cart</span>
          {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'var(--bg-primary)',
    padding: '1rem 2rem',
    borderBottom: '1px solid rgba(215,210,204,0.12)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    textDecoration: 'none',
  },
  leftGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  },
  categories: {
    display: 'flex',
    gap: '1rem',
    marginLeft: '1rem'
  },
  catLink: {
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontWeight: '600'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#d7d2cc',
  },
  logoPlain: {
    color: '#d7d2cc',
    fontWeight: '700',
  },
  gradientLetter: {
    background: 'linear-gradient(90deg, #d7d2cc 0%, #304352 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    fontWeight: '800',
  },
  cartLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#d7d2cc',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    background: 'rgba(215,210,204,0.06)',
    border: '1px solid rgba(215,210,204,0.12)',
    position: 'relative',
  },
  cartIcon: {
    fontSize: '1.2rem',
  },
  cartText: {
    marginLeft: '8px',
    color: 'var(--text-primary)',
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: '#d7d2cc',
    color: '#304352',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '600',
  },
};

export default Navbar;
