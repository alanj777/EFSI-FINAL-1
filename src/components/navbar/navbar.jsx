import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import Home from '../img/Home.png';
import perfil from '../img/Perfil-white.png';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="custom-navbar">
      <div className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
        <Link to="/home">
          <img src={Home} alt="home" className="Home" />
          <span className="nav-text">Main Page</span>
        </Link>
      </div>
      
      <div className={`nav-item ${location.pathname === '/perfil' ? 'active' : ''}`}>
        <Link to="/perfil">
          <img src={perfil} alt="perfil" className="Perfil" />
          <span className="nav-text">Perfil</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
