import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from '../store/authSlice';
import { BASE_URL } from '../App';
import { setCommunes } from '../store/chileSlice';
const ReCaptchaForm = ({ regions }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
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
    const inputBase = "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400";

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
  <div className="max-w-md mx-auto my-10 bg-white shadow-md rounded-lg p-6 border border-gray-200">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
      {isRegister ? "Crear cuenta" : "Iniciar Sesión"}
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      {isRegister && (
        <>
          <div className="flex gap-2">
            <input type="text" name="primer_nombre" placeholder="Primer Nombre" value={formData.primer_nombre} onChange={handleInputChange} className="input-field w-1/2" required />
            <input type="text" name="segundo_nombre" placeholder="Segundo Nombre" value={formData.segundo_nombre} onChange={handleInputChange} className="input-field w-1/2" />
          </div>
          <div className="flex gap-2">
            <input type="text" name="primer_apellido" placeholder="Primer Apellido" value={formData.primer_apellido} onChange={handleInputChange} className="input-field w-1/2" required />
            <input type="text" name="segundo_apellido" placeholder="Segundo Apellido" value={formData.segundo_apellido} onChange={handleInputChange} className="input-field w-1/2" />
          </div>
          <div className="flex gap-2">
            <input type="text" name="run" placeholder="RUN" value={formData.run} onChange={handleInputChange} className="input-field w-2/3" required />
            <input type="text" name="dv" placeholder="DV" value={formData.dv} onChange={handleInputChange} className="input-field w-1/3" required />
          </div>

          <select name="region" value={formData.region} onChange={handleRegionChange} className="input-field" required>
            <option value="" disabled>Selecciona una región</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>{region.nombre}</option>
            ))}
          </select>

          <select name="comuna" value={formData.comuna} onChange={handleInputChange} className="input-field" required disabled={loading}>
            <option value="" disabled>Selecciona una comuna</option>
            {comunas.map((comuna) => (
              <option key={comuna.id} value={comuna.id}>{comuna.nombre}</option>
            ))}
          </select>

          <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleInputChange} className="input-field" required />
        </>
      )}

      <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleInputChange} className="input-field" required />

      <div className="relative">
        <input type={showPassword ? "text" : "password"} name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange} className="input-field pr-16" required />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-blue-600 text-sm">
          {showPassword ? "Ocultar" : "Ver"}
        </button>
      </div>

      {isRegister && (
        <div className="relative">
          <input type={showPasswordConfirm ? "text" : "password"} name="password_confirm" placeholder="Confirmar Contraseña" value={formData.password_confirm} onChange={handleInputChange} className="input-field pr-16" required />
          <button type="button" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className="absolute right-3 top-2 text-blue-600 text-sm">
            {showPasswordConfirm ? "Ocultar" : "Ver"}
          </button>
        </div>
      )}

      {isRegister && (
        <div className="flex flex-col items-center">
          <button onClick={handleReCaptcha} type="button" className={`w-full py-2 mt-2 rounded ${loading ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"} transition-all`} disabled={loading || captchaToken}>
            {loading ? <Spinner className="w-5 h-5" /> : (captchaToken ? "Verificación completada" : "Verificar reCAPTCHA")}
          </button>
          {captchaToken && <p className="text-sm text-green-600 mt-2">¡CAPTCHA verificado con éxito!</p>}
        </div>
      )}

      <button type="submit" disabled={!isFormValid} className={`w-full py-2 mt-4 rounded ${isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-white"} transition`}>
        {isRegister ? "Registrar" : "Iniciar Sesión"}
      </button>
    </form>

    <p className="text-center text-sm mt-4">
      {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
      <button onClick={toggleAuthMode} className="text-blue-600 hover:underline">
        {isRegister ? "Inicia sesión" : "Regístrate"}
      </button>
    </p>
  </div>
);

};

export default ReCaptchaForm;
