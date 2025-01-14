import React, { useState } from 'react';
import axios from 'axios';
import { Spinner } from "@material-tailwind/react";

const ContactForm = () => {
    const [captchaToken, setCaptchaToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const siteKey = '6Ld10nAqAAAAAAhQJFjfUonRt-6H1JH3Kc5EQxXK';

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [reason, setReason] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleReCaptcha = async () => {
        setLoading(true);
        const minWaitTime = new Promise(resolve => setTimeout(resolve, 2000));

        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(siteKey, { action: 'submit' }).then(async (token) => {
                await minWaitTime;
                setCaptchaToken(token);
                setLoading(false);
            });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            alert("Por favor completa el CAPTCHA.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('/api/contact/', { 
                firstName, 
                lastName, 
                reason, 
                email, 
                phone, 
                message, 
                captchaToken 
            });
            alert("¡Mensaje enviado con éxito!");
        } catch (error) {
            alert("Error al enviar el mensaje.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-6 border border-gray-300 rounded-lg max-w-sm mx-auto mt-10">
            <h2 className="text-lg font-semibold text-gray-700">Formulario de Contacto</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="p-2 border rounded"
                    required
                >
                    <option value="">Seleccione el motivo</option>
                    <option value="work">Trabajo</option>
                    <option value="weather">Clima</option>
                    <option value="color">Color</option>
                    <option value="other">Otros</option>
                </select>
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="tel"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Mensaje"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="p-2 border rounded"
                    rows="4"
                    required
                />

                <div className="flex flex-col items-center">
                    <button
                        onClick={handleReCaptcha}
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center justify-center mt-4"
                        disabled={loading || captchaToken}
                    >
                        {loading ? <Spinner className="w-5 h-5" /> : 'Verificar reCAPTCHA'}
                    </button>
                    {captchaToken && (
                        <p className="text-sm text-green-600 mt-2">¡CAPTCHA verificado con éxito!</p>
                    )}
                </div>

                <button
                    type="submit"
                    className={`text-white px-4 py-2 rounded flex items-center justify-center ${captchaToken && firstName && lastName && reason && email && phone && message ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'}`}
                    disabled={!captchaToken || !firstName || !lastName || !reason || !email || !phone || !message}
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
