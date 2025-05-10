import React, { useState } from 'react';
import { Input, Select, Option, Textarea, Button, Typography } from "@material-tailwind/react";
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
    const [feedback, setFeedback] = useState({ success: '', error: '' });

    const handleInputChange = ({ target: { name, value } }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        const { nombres, email, mensaje } = formData;
        if (!nombres.trim() || !email.trim() || !mensaje.trim()) {
            setFeedback({ error: 'Completa los campos obligatorios.', success: '' });
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
            setFeedback({ success: '¡Mensaje enviado exitosamente!', error: '' });
            setFormData({
                nombres: '', apellidos: '', email: '', telefono: '', motivo: '', mensaje: ''
            });
        } catch {
            setFeedback({ error: 'Error al enviar el formulario. Intenta más tarde.', success: '' });
        }
    };

    return (
        <div className="max-w-2xl w-full mx-auto mt-12 p-6 bg-white rounded shadow-md flex flex-col gap-5">
            <Typography variant="h4" color="blue-gray" className="text-center">
                Contáctanos
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nombres" name="nombres" value={formData.nombres} onChange={handleInputChange} required />
                <Input label="Apellidos" name="apellidos" value={formData.apellidos} onChange={handleInputChange} />
                <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                <Input label="Teléfono" name="telefono" value={formData.telefono} onChange={handleInputChange} />
            </div>

            <Select
                label="Motivo"
                value={formData.motivo}
                onChange={(val) => handleInputChange({ target: { name: 'motivo', value: val } })}
              >
                <Option value="producto">Producto</Option>
                <Option value="servicio">Servicio</Option>
                <Option value="otro">Otro</Option>
            </Select>

            <Textarea label="Mensaje" name="mensaje" value={formData.mensaje} onChange={handleInputChange} required />

            {feedback.success && <p className="text-green-600">{feedback.success}</p>}
            {feedback.error && <p className="text-red-600">{feedback.error}</p>}

            <Button color="blue" onClick={handleSubmit}>Enviar</Button>
        </div>
    );
};

export default Contact;
