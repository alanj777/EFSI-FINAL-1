
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import FormInput from '../../components/FormInput'; 
import "./styles.css";
const DetalleEvento = ({ event = {} }) => {
    const [eventDetails, setEventDetails] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fetch event details
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`${config.url}api/event`);
                setEventDetails(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
            
        };
        const fetchUserDetails = async () => {
            try {
                const userResponse = await axios.get(`${config.url}api/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`  // Asegúrate de pasar el token JWT si estás utilizando autenticación basada en tokens
                    }
                });
                setUserId(userResponse.data.id);  // Ajusta esto según la estructura de la respuesta
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('No se pudo obtener la información del usuario.');
            }
        };

        fetchEventDetails();
        fetchUserDetails(); 

    }, []);


    return (
        <div>
            <h1>{event.name || "Sin nombre"}</h1>
            <p>{event.description || "Sin descripción"}</p>
            <p>{event.startDate || "Fecha no disponible"}</p>
            <p>{event.category || "Categoría no disponible"}</p>
        </div>
    );
};

export default DetalleEvento;

