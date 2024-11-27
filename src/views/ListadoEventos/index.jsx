import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard'; 
import './styles.css';
import config from '../../config';

const ListadoEventos = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get(`${config.url}api/events`);
                setEventos(response.data); 
            } catch (error) {
                setError('No se pudieron cargar los eventos.');
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    if (loading) {
        return <div className="loading">Cargando eventos...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="event-list-container">
            <h2>Lista de Eventos</h2>
            <div className="event-list">
                {eventos.map((evento) => (
                    <EventCard key={evento.id} evento={evento} />
                ))}
            </div>
        </div>
    );
}

export default ListadoEventos;
