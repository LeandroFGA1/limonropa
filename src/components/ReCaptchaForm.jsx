import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from '../store/authSlice';
import { BASE_URL } from '../App';
import { setCommunes } from '../store/chileSlice';
const ReCaptchaForm = ({ regions }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const siteKey = '6Ld10nAqAAAAAAhQJFjfUonRt-6H1JH3Kc5EQxXK';
    const [comunas, setComunas] = useState([]);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const communes = useSelector((state) => state.chile.communes);

    const [formData, setFormData] = useState({
        email: '',
        regions: '',
        password: '',
        password_confirm: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        run: '',
        dv: '',
        region: '',
        comuna: '',
        direccion: '',
    });

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    

    const applyFiltersToFormData = () => {
        const filteredData = { ...formData };
        for (const key in filteredData) {
            if (key === "email" || key === "password" || key === "password_confirm") continue;
            filteredData[key] = capitalize(filteredData[key].trim());
        }
        return filteredData;
    };

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
    const toggleAuthMode = () => {
        setIsRegister(!isRegister);
        setIsLogin(!isLogin);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    

    const [nextPageUrl, setNextPageUrl] = useState(null); 

    const fetchComunas = async (regionId) => {
        setLoading(true);
        let currentPage = 1;
        const allComunas = []; 
    
        try {
            let response;
            do {
                const url = `${BASE_URL}/api/RegionYComunaCL/comuna/?id_region=${regionId}&page=${currentPage}`;
                response = await axios.get(url);
                allComunas.push(...response.data.results);
                currentPage++;
            } while (response.data.next);
    
            setComunas(allComunas);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };
    
    
    
    
    
    const handleRegionChange = (e) => {
        const selectedRegionId = e.target.value;
        setFormData((prev) => ({
            ...prev,
            region: selectedRegionId,
        }));
        setComunas([]);
        fetchComunas(selectedRegionId);
    };
    
    
    


const handleLogin = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/api/usuarios/login/`, {
            email: formData.email,
            password: formData.password,
        });
        const { access, refresh } = response.data;

        const emailInitials = formData.email
            .split("@")[0] 
            .substring(0, 2) 
            .toUpperCase();

        dispatch(loginSuccess({
            email: formData.email,
            initials: emailInitials,
            accessToken: access,
            refreshToken: refresh,
        }));
        
        navigate("/");
    } catch (error) {
        alert("Error en el inicio de sesión.");
    }
};


    const handleRegister = async () => {
        try {
            const filteredFormData = applyFiltersToFormData();
            const response = await axios.post(`${BASE_URL}/api/usuarios/clientes/`, filteredFormData);
            alert("¡Registro exitoso!");
            setIsRegister(false);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

        } catch (error) {
            alert("Error en el registro.");
            alert(error)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        isRegister ? handleRegister() : handleLogin();
    };
    useEffect(() => {
        if (formData.region) {
            fetchComunas(formData.region); 
        }
    }, [formData.region]);
    

    const isPasswordValid = formData.password.length >= 6 && /[A-Z]/.test(formData.password) && /\d/.test(formData.password);
    const areRegisterFieldsValid = Object.values(formData).every((field) => field.trim() !== '');

    const isFormValid = isLogin
    ? formData.email && formData.password 
    : isPasswordValid && captchaToken;

    return (
        <div className="flex flex-col items-center space-y-4 p-6 border border-gray-300 rounded-lg max-w-sm mx-auto mt-10">
            <h2 className="text-lg font-semibold text-gray-700">
                {isRegister ? "Registro" : "Inicio de Sesión"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
                {isRegister && (
                    <>
                        <input
                            type="text"
                            name="primer_nombre"
                            placeholder="Primer Nombre"
                            value={formData.primer_nombre}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="segundo_nombre"
                            placeholder="Segundo Nombre"
                            value={formData.segundo_nombre}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="primer_apellido"
                            placeholder="Primer Apellido"
                            value={formData.primer_apellido}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="segundo_apellido"
                            placeholder="Segundo Apellido"
                            value={formData.segundo_apellido}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="run"
                            placeholder="RUN"
                            value={formData.run}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="dv"
                            placeholder="Dígito Verificador"
                            value={formData.dv}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            required
                        />
                        <select
                            name="region"
                            value={formData.region}
                            onChange={handleRegionChange}
                            className="p-2 border rounded"
                            required
                        >
                            <option value="" disabled>Selecciona una región</option>
                            {regions.map((region) => (
                                <option key={region.id} value={region.id}>{region.nombre}</option> 
                            ))}
                        </select>


                        <select
                            name="comuna"
                            value={formData.comuna}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            disabled={loading}
                            required
                        >
                            <option value="" disabled>Selecciona una comuna</option>
                            {comunas.map((comuna) => (
                                <option key={comuna.id} value={comuna.id}>{comuna.nombre}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            name="direccion"
                            placeholder="Dirección"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            required
                        />
                    </>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    minLength={10}
                    className="p-2 border rounded"
                    required
                />
                {isRegister && (
                    <input
                        type="password"
                        name="password_confirm"
                        placeholder="Confirmar Contraseña"
                        value={formData.password_confirm}
                        onChange={handleInputChange}
                        minLength={10}
                        className="p-2 border rounded"
                        required
                    />
                )}
                <div className="flex flex-col items-center">
                {isLogin ? (
                    <p className="text-lg text-gray-700">Completar los campos para continuar</p>
                ) : (
                    <>
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
                    </>
                )}
            </div>

                <button
                    type="submit"
                    className={`px-4 py-2 rounded flex items-center justify-center ${
                        isFormValid ? "bg-blue-500 text-white hover:bg-blue-600 transition" : "bg-gray-400 text-gray-200"
                    }`}
                    disabled={!isFormValid}
                >
                    {isRegister ? 'Registrar' : 'Iniciar Sesión'}
                </button>
            </form>
            <button
                onClick={toggleAuthMode}
                className="text-blue-500 hover:underline text-sm mt-2"
            >
                {isRegister ? "¿Ya tienes cuenta? Inicia Sesión" : "¿No tienes cuenta? Regístrate"}
            </button>
        </div>
    );
};

export default ReCaptchaForm;
