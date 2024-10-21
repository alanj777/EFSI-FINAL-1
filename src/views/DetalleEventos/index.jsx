import React, { useState, useEffect, useContext } from 'react';  // Agrega useContext
import axios from 'axios';
import config from '../../config';
import { AuthContext } from '../../AuthContext';  // Importa AuthContext
import "./styles.css";

const DetalleEvento = ({ match }) => { //Empiezan detalles (se vienen cositas)
    const { id } = match.params;
    const [eventDetails, setEventDetails] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [error, setError] = useState('');
    const { user, token } = useContext(AuthContext);  // Usa AuthContext para obtener el usuario y el token

    useEffect(() => {
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(`${config.url}api/event/${id}`);
          setEventDetails(response.data);
        } catch (error) {
          console.error('Error fetching event details:', error);
          setError('No se pudo cargar el evento.');
        }
      };

      fetchEventDetails();
    }, [id]);

    const handleSubscribe = async () => {
      if (eventDetails.subscribers.length < eventDetails.max_assistance) {  // Verificando capacidad
        try {
          await axios.post(`${config.url}api/event/${id}/subscribe`, 
            { userId: user.id },  //ID del usuario autenticado
            {
              headers: {
                Authorization: `Bearer ${token}`  // Añadiendo token para autenticación
              }
            }
          );
          setIsSubscribed(true);
          setError('');
        } catch (error) {
          console.error('Error subscribing to event:', error);
          setError('No se pudo suscribir al evento.');
        }
      } else {
        setError('No hay plazas disponibles para este evento.');
      }
    };

    return (
      <div>
        {eventDetails ? (
          <>
            <h1>{eventDetails.name}</h1>
            <p>{eventDetails.description}</p>
            <p>Fecha de inicio: {new Date(eventDetails.start_date).toLocaleString()}</p>
            {/* Mostrar la categoría del evento */}
            <p>Categoría: {eventDetails.event_category ? eventDetails.event_category.name : "Categoría no disponible"}</p>
            <p>Plazas disponibles: {eventDetails.max_assistance - eventDetails.subscribers.length}</p>
            <button onClick={handleSubscribe} disabled={isSubscribed}>
              {isSubscribed ? 'Inscripto' : 'Suscribirse'}
            </button>
            {error && <p>{error}</p>}
          </>
        ) : (
          <p>Cargando detalles del evento...</p>
        )}
      </div>
    );
  };

export default DetalleEvento;
