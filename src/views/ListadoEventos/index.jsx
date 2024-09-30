import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import FormInput from '../../components/FormInput'; 
import "./styles.css";

const ListadoEventos = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1); 
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState({
        tag: '',
        startDate: '',
        name: '',
        category: ''
    });
    const [applyFilters, setApplyFilters] = useState(false);  
    const fetchEvents = async () => {
        const { name = '', tag = '', category = '' } = filters;
        let queryParams = [];

        if (name.trim()) queryParams.push(`name=${name}`);
        if (tag.trim()) queryParams.push(`tag=${tag}`);
        if (filters.startDate.trim()) {
            const formattedDate = new Date(filters.startDate).toISOString().split('T')[0];
            queryParams.push(`startdate=${formattedDate}`);
        }
        if (category.trim()) queryParams.push(`category=${category}`);
        queryParams.push(`page=${page}`);
        queryParams.push(`limit=${limit}`);
        const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
        console.log('Fetching data with query:', `${config.url}api/event${queryString}`);
        try {
            const response = await axios.get(`${config.url}api/event${queryString}`);
            const eventsData = response?.data?.collection || [];
            setEvents(eventsData);
            const totalEvents = response?.data?.pagination?.total || 0;
            setTotal(totalEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
            setEvents([]);
            setTotal(0);
        }
    };
    useEffect(() => {
        fetchEvents();
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [page, applyFilters]);
    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };
    const handleApplyFilters = () => {
        setPage(1);  
        setApplyFilters(!applyFilters);  
    };
    const handleNextPage = () => {
        if (page * limit < parseInt(total)) {
            setPage(page + 1);
        }
    };
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    return (
        <div className="event-list">
            <h1>Lista de Eventos</h1>      
            <div className="filters">
                <FormInput
                    label="Buscar por nombre"
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    placeholder="Buscar por nombre"
                />
                <FormInput
                    label="Categoría"
                    type="text"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    placeholder="Categoría"
                />
                <FormInput
                    label="Etiqueta"
                    type="text"
                    name="tag"
                    value={filters.tag}
                    onChange={handleFilterChange}
                    placeholder="Etiqueta"
                />
                <FormInput
                    label="Fecha de inicio"
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                />
                <button onClick={handleApplyFilters}>Aplicar Filtros</button>
            </div>
            <ul>
                {events.length > 0 ? (
                    events.map(event => (
                        <li key={event.id}>
                            <h2>{event.name}</h2>
                            <p>{event.description}</p>
                            <p>Categoría: {event.event_category.name}</p>
                            <p>Locacion: {event.event_location.full_address}</p>
                            <p>Fecha de inicio: {new Date(event.start_date).toLocaleString()}</p>
                            <p>Tags: {event.tags ? event.tags.map(tag => tag.name).join(', ') : 'N/A'}</p>
                        </li>
                    ))
                ) : (
                    <p>No hay eventos disponibles</p>
                )}
            </ul>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Anterior
                </button>
                <span>Página {page}</span>
                <button onClick={handleNextPage} disabled={page * limit >= total}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}
export default ListadoEventos;
