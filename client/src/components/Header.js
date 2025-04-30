import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1 style={{ margin: '20px 0', textAlign: 'center', color: '#3498db' }}>
        Team Speed
      </h1>
      <nav style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <Link to="/" className="btn" style={{ marginRight: '10px' }}>
          Home
        </Link>
      </nav>
    </header>
  );
};

export default Header;