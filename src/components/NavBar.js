import React from "react";

import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
    <ul className="header__nav-ul">
      <li className="header__nav-li first-link-nav">
        <Link to="/" className="link-header-nav">
          Home
        </Link>
      </li>
      <li className="header__nav-li">
        <Link to="/about" className="link-header-nav">
          Nosotros
        </Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
