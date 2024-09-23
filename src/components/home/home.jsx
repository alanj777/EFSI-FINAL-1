import React from 'react';
import Header from './header';
import Card from './card.jsx';
import Cookies from 'js-cookie';
import EmergencyButton from './Emergencybutton.jsx';
import './home.css';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar.jsx';

function Home() {
  return (
    <div className="Home">
      <Header />
      <main>

      </main>
      <Navbar/>
    </div>
  );
}

export default Home;
