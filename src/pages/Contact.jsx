import React, { useState } from 'react';
import { Input, Typography, Select, Option, Textarea, Button } from "@material-tailwind/react";
import ReCaptcha from '../components/ReCaptcha';

const Contact = () => {
    const [emailCellphone, setEmailCellphone] = useState('');
    const [captchaToken, setCaptchaToken] = useState(''); // Estado para el token de reCAPTCHA

    // Función que recibe el token de reCAPTCHA y lo guarda en el estado
    const handleCaptcha = (token) => {
        setCaptchaToken(token);
    };

    return (
        <div className=" flex w-full flex-col items-center justify-center gap-4 px-6 mt-3">
            <Input
                maxLength={50}
                label="Nombres"
                placeholder="Juan Nicolás"
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Input
                maxLength={50}
                label="Apellido"
                placeholder="Juarez Pérez"
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Input
                label="Email"
                placeholder="juan@ejemplo.com"
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Select label="Motivo">
                <Option value="producto">Producto</Option>
                <Option value="servicio">Servicio</Option>
                <Option value="otro">Otros</Option>
            </Select>
            <Textarea label="Mensaje" />
            <ReCaptcha onVerify={handleCaptcha} />
            <Button> enviar</Button>
        </div>
    );
};

export default Contact;
