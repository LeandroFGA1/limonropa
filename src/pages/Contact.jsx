import React, { useState } from 'react';
import { Input, Select, Option, Textarea, Button, Tooltip } from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../App';

const Contact = () => {
    const { state } = useLocation();
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        motivo: state?.motivo || '',
        mensaje: state?.mensaje || ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.nombres.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
        setErrorMessage('Completa los campos obligatorios.');
        setSuccessMessage('');
        return;
        }

        try {
        const payload = {
            nombre: formData.nombres,
            apellidos: formData.apellidos,
            email: formData.email,
            telefono: formData.telefono,
            tipo_contacto: formData.motivo,
            mensaje: formData.mensaje,
        };

        await axios.post(`${BASE_URL}api/contact/`, payload);
        setSuccessMessage('¡Mensaje enviado exitosamente!');
        setErrorMessage('');
        setFormData({ nombres: '', apellidos: '', email: '', telefono: '', motivo: '', mensaje: '' });
        } catch (error) {
        console.log(error);
        if (error.response) {
            setErrorMessage('Error desconocido al enviar el formulario.');
        } else {
            setErrorMessage('Error al conectar con el servidor.');
        }
        setSuccessMessage('');
        }
    };

    return (
        <div className="flex w-full flex-col items-center justify-center gap-4 px-6 mt-3">
        <Input
            name="nombres"
            maxLength={50}
            label="Nombres"
            placeholder="Juan Nicolás"
            value={formData.nombres}
            onChange={handleInputChange}
        />
        <Input
            name="apellidos"
            maxLength={50}
            label="Apellido"
            placeholder="Juarez Pérez"
            value={formData.apellidos}
            onChange={handleInputChange}
        />
        <Input
            name="email"
            label="Email"
            placeholder="juan@ejemplo.com"
            value={formData.email}
            onChange={handleInputChange}
        />
        <Input
            name="telefono"
            label="Teléfono"
            placeholder="12345678"
            value={formData.telefono}
            onChange={handleInputChange}
        />
        <Select
            name="motivo"
            label="Motivo"
            value={formData.motivo}
            onChange={(e) => handleInputChange({ target: { name: 'motivo', value: e } })}
        >
            <Option value="producto">Producto</Option>
            <Option value="servicio">Servicio</Option>
            <Option value="otro">Otros</Option>
        </Select>
        <Textarea
            name="mensaje"
            label="Mensaje"
            value={formData.mensaje}
            onChange={handleInputChange}
        />
        {successMessage && <Tooltip content={successMessage}><p className="text-green-500">{successMessage}</p></Tooltip>}
        {errorMessage && <Tooltip content={errorMessage}><p className="text-red-500">{errorMessage}</p></Tooltip>}
        <Button onClick={handleSubmit}>Enviar</Button>
        </div>
    );
};

export default Contact;
