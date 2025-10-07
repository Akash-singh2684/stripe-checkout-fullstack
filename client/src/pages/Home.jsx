import React from 'react';
import ProductList from '../components/ProductList';
import SidebarCart from '../components/SidebarCart';

const Home = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.main}>
        <ProductList />
      </div>
      <div style={styles.side}>
        <SidebarCart />
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start',
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  main: {
    flex: 1,
  },
  side: {
    width: '320px',
  }
}

export default Home;
