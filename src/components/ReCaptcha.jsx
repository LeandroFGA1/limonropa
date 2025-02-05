import React, { useState } from 'react';
import { Spinner } from "@material-tailwind/react";

const ReCaptcha = ({ onVerify }) => {
    const [loading, setLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const siteKey = '6Ld10nAqAAAAAAhQJFjfUonRt-6H1JH3Kc5EQxXK';

    const handleReCaptcha = async () => {
        setLoading(true);
        const minWaitTime = new Promise(resolve => setTimeout(resolve, 2000));

        window.grecaptcha.ready(() => {
        window.grecaptcha.execute(siteKey, { action: 'submit' }).then(async (token) => {
            await minWaitTime;
            setCaptchaToken(token);
            onVerify(token); 
            setLoading(false);
        });
        });
    };

    return (
        <div className="flex flex-col items-center">
        <button
            onClick={handleReCaptcha}
            type="button"
            className={`px-4 py-2 rounded mt-4 flex items-center justify-center ${
                loading ? "bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600 transition"
            }`}
            disabled={loading || captchaToken}
            >
            {loading ? (
                <Spinner className="w-5 h-5" />
            ) : (
                captchaToken ? "Verificación completada" : "Verificar reCAPTCHA"
            )}
        </button>
        {captchaToken && (
            <p className="text-sm text-green-600 mt-2">
            ¡CAPTCHA verificado con éxito!
            </p>
        )}
        </div>
    );
};

export default ReCaptcha;
