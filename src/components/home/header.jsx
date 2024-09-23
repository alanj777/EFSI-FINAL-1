import React from 'react';
import Cookies from 'js-cookie';
import FotoP from '../img/juan.png';

const Header = () => {
  // Leer las cookies
  const userCookie = Cookies.get('user');
  const emailCookie = Cookies.get('email');
  const IdCookie = Cookies.get('userId');

  console.log("La cookie", userCookie);

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar las cookies
    Cookies.remove('user');
    Cookies.remove('email');
    Cookies.remove('userId');
    
    window.location.href = '/';
  };

  return (
    <header className="custom-header">
      <img src={FotoP} alt="profile" className="custom-profile-img" />
      <div className="custom-text-container">
        <h1>Hola, {userCookie || 'Usuario'}!</h1>
        <p className="custom-email">{emailCookie || 'Correo no disponible'}</p>
      </div>
      
      <button className="logout-button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;
