import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../../components/FormInput';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import { Link } from 'react-router-dom';

const InicioSesion = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = { username: '', password: '' };
        if (formData.username.trim().length < 3) {
            newErrors.username = 'El nombre de usuario debe tener mínimo 3 caracteres';
            valid = false;
        }
        if (formData.password.trim().length < 6) {
            newErrors.password = 'La contraseña debe tener mínimo 6 caracteres';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(`${config.url}api/user/login`, formData);
                if (response.data.success) {
                    localStorage.setItem("token", response.data.token);
                    navigate("/"); 
                    window.location.reload();
                } else {
                    setLoginError(response.data.message);
                }
            } catch (error) {
                setLoginError('Error iniciando sesión. Intentá de nuevo.');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Nombre de Usuario"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Ingresá tu nombre de usuario"
                />
                {errors.username && <p className="error-text">{errors.username}</p>}
                
                <FormInput
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingresá tu contraseña"
                />
                {errors.password && <p className="error-text">{errors.password}</p>}

                {loginError && <p className="error-text">{loginError}</p>}
                
                <button type="submit" className="btn btn-primary">Iniciá Sesión</button>
                <p>¿No tenés una cuenta? <Link to="/register">Registrate acá</Link></p>
            </form>
        </div> 
    );
}

export default InicioSesion;
