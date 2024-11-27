import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../config';
import { AuthContext } from '../../AuthContext';
import "./styles.css";

const DetalleEvento = ({ match }) => {
    const { id } = match.params;
    const [eventDetails, setEventDetails] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [error, setError] = useState('');
    const { user, token } = useContext(AuthContext);

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
        if (eventDetails.subscribers.length < eventDetails.max_assistance) {
            try {
                await axios.post(`${config.url}api/event/${id}/subscribe`, 
                    { userId: user.id }, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setIsSubscribed(true);
                setError('');
            } catch (error) {
                console.error('Error suscribiéndote al evento:', error);
                setError('No te pudiste suscribir al evento.');
            }
        } else {
            setError('No hay lugar disponible para este evento.');
        }
    };

    return (
        <div className="event-detail">
            {eventDetails ? (
                <>
                    <h1>{eventDetails.name}</h1>
                    <p>{eventDetails.description}</p>
                    <p>Fecha de inicio: {new Date(eventDetails.start_date).toLocaleString()}</p>
                    <p>Categoría: {eventDetails.event_category ? eventDetails.event_category.name : "Categoría no disponible"}</p>
                    <p>Plazas disponibles: {eventDetails.max_assistance - eventDetails.subscribers.length}</p>
                    <button onClick={handleSubscribe} disabled={isSubscribed} className="btn-subscribe">
                        {isSubscribed ? 'Suscripto' : 'Suscribirse'}
                    </button>
                    {error && <p className="error-text">{error}</p>}
                </>
            ) : (
                <p>Cargando detalles del evento...</p>
            )}
        </div>
    );
};

export default DetalleEvento;
