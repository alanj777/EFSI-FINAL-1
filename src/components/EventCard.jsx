import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ evento }) => {
    return (
        <div className="event-card">
            <img src={evento.imageUrl} alt={evento.name} />
            <div className="event-info">
                <h3>{evento.name}</h3>
                <p>{evento.description}</p>
                <p className="event-date">{new Date(evento.date).toLocaleDateString()}</p>
                <Link to={`/event/${evento.id}`} className="btn btn-primary">Ver detalles</Link>
            </div>
        </div>
    );
}

export default EventCard;
