import React from 'react';
import logoImg from '../../img/golden-monkey-logo.png';
import './styles.css';

function Header() {
    return (
      <div className="Header">
        <span>
          <img src={logoImg} id="header-logo" />
        </span>
        <span>
        <h1 align="center">Welcome to Golden Monkey T-Shirts Online Store</h1>
        </span>
      </div>
    );
}

export default Header;