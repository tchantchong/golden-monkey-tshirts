import React from 'react';
import logoImg from '../../img/golden-monkey-logo.png';
import './styles.css';

function Header() {
    return (
      <div className="Header">
        <span>
          <img src={logoImg} id="header-logo" alt="Golden Monkey Logo"/>
        </span>
        <span>
        <h1 align="center">Golden Monkey T-Shirts</h1>
        </span>
      </div>
    );
}

export default Header;