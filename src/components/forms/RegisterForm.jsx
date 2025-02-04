import React, { useState,useEffect } from 'react';
import { Input, Select, Option, Button } from '@material-tailwind/react';
import ReCaptcha from '../ReCaptcha';
import { useSelector,useDispatch } from 'react-redux';
import { setRegions } from '../../store/chileSlice';
import { BASE_URL } from '../../App';
import axios from 'axios';

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [run, setRun] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [comuna, setComuna] = useState("");
    const [comunas, setComunas] = useState([]);
    const [region, setRegion] = useState("");
    const [payment, setPayment] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");
    const [showError,setShowError] = useState("");
    const [loading,setLoading] = useState(false)
    const regions = useSelector((state) => state.chile.regions);
    const dispatch = useDispatch();

    const handleRegionChange = (selectedValue) => {
        setRegion(selectedValue);
        fetchComunas(selectedValue);
    };
    const handleComunaChange = (event) => {
        const selectedComuna = comunas.find(comuna => comuna.id === parseInt(event));
        setComuna(selectedComuna.nombre);
    };
    
    useEffect(() => {
        if (comuna) {

            fixComuna(comuna); // Otras acciones que dependan de 'comuna'
        }
    }, [comuna]);
    
    const fixComuna = (valor) =>{
        setComuna(valor)
    }
    
    
    
    

    useEffect(() => {
        if (regions.length === 0) {
            const fetchAllRegions = async () => {
                try {
                    let allRegions = [];
                    let nextPage = `${BASE_URL}/api/RegionYComunaCL/region/`;
    
                    while (nextPage) {
                        const response = await axios.get(nextPage);
                        allRegions = [...allRegions, ...response.data.results];
    
                        nextPage = response.data.next
                            ? response.data.next.replace('http://', 'https://')
                            : null;
                    }
                    dispatch(setRegions(allRegions));
                } catch (error) {
                    console.error('Error fetching regions:', error);
                }
            };
            fetchAllRegions();
        }
    }, [dispatch, regions.length]);    

    const fetchComunas = async (regionId) => {
        setLoading(true);
        let currentPage = 1;
        const allComunas = [];
    
        try {
            let response;
            do {
                const url = `${BASE_URL}api/RegionYComunaCL/comuna/?id_region=${regionId}&page=${currentPage}`;
                response = await axios.get(url);
                allComunas.push(...response.data.results); 
                currentPage++; 
            } while (response.data.next); 
            setComunas(allComunas);
        } catch (error) {
            console.error("Error fetching comunas:", error);
        } finally {
            setLoading(false);
        }
    };



    const handleCaptcha = (token) => {
        setCaptchaToken(token);
    };

    const validarRUN = (runCompleto) => {
        const run = runCompleto.slice(0, -1);
        const dvIngresado = runCompleto.slice(-1).toUpperCase();
        let suma = 0;
        let multiplicador = 2;

        for (let i = run.length - 1; i >= 0; i--) {
            suma += parseInt(run.charAt(i)) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        const resto = 11 - (suma % 11);
        const dvCalculado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
        return dvCalculado === dvIngresado ? true : false;
    };


    const Checkdata = (event) => {
        event.preventDefault();
        const trimmedName = name.trim().toLowerCase();
        const namePattern = /^[a-záéíóúñü\s]+$/i;
    
        if (!namePattern.test(trimmedName)) {
            setShowError("El nombre solo debe contener letras.");
            return;
        } else {
            setName(trimmedName);
        }
    
        const trimmedSurname = surname.trim().toLowerCase();
        const surnamePattern = /^[a-záéíóúñü\s]+$/i;
        if (!surnamePattern.test(trimmedSurname)) {
            setShowError("El apellido solo debe contener letras.");
            return;
        } else {
            setSurname(trimmedSurname);
        }
    
        const trimmedRUN = run.trim().toLowerCase();
        const RUNPattern = /^[0-9]+[kK]?$/;
        if (!RUNPattern.test(trimmedRUN)) {
            setShowError("El RUN solo puede contener numeros y la letra k en algunos casos.");
            return;
        } else {
            if (!validarRUN(trimmedRUN)) {
                setShowError("El RUN y/o el DV son incorrectos.");
                return;
            }
            setRun(trimmedRUN);
        }
    
        const trimmedEmail = email.trim().toLowerCase();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(trimmedEmail)) {
            setShowError("Correo inválido.");
            return;
        }
    
        // Si todo está correcto, mostrar los datos en console.log
        console.log("Datos del formulario:", {
            nombre: trimmedName,
            apellido: trimmedSurname,
            run: trimmedRUN,
            email: trimmedEmail,
            contraseña: password,
            confirmarContraseña: rePassword,
            region: region,
            comuna: comuna,
            metodoDePago: payment,
            captchaToken: captchaToken
        });
    
        setShowError(""); // Resetear errores si todo va bien
    };
    

    return (
    <form  onSubmit={Checkdata}>
        <Input
            label='nombre'
            placeholder='introduce tu/s nombre/s'
            type='text'
            minLength={2}
            maxLength={30}
            value={name}
            onChange={(event) => setName(event.target.value)}
        />
        <Input
            label='apellido'
            placeholder='introduce tu/s apellido/s'
            type='text'
            minLength={2}
            maxLength={30}
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
        />
        <Input
            label='RUN-DV'
            placeholder='introduce tu RUN'
            type='text'
            minLength={7}
            maxLength={9}
            value={run}
            onChange={(event) => setRun(event.target.value)}
        />
        <Input
            label='email'
            placeholder='introduce tu email'
            minLength={4}
            maxLength={30}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />
        <Input
            label='contraseña'
            placeholder='introduce tu contraseña'
            minLength={10}
            maxLength={30}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
        />
        <Input
            label='repite contraseña'
            placeholder='repite tu contraseña'
            minLength={10}
            maxLength={30}
            value={rePassword}
            onChange={(event) => setRePassword(event.target.value)}
        />
        <Select
            label='Selecciona tu región'
            value={region}
            onChange={handleRegionChange}
            required
        >
            {regions.map((region) => (
                <Option key={region.id} value={String(region.id)}>
                    {region.nombre}
                </Option>
            ))}
        </Select>

        <Select
            label='Selecciona tu comuna'
            
            onChange={handleComunaChange}
            required
        >
            {comunas.map((comunaActive) => (
                <Option key={comunaActive.id} value={String(comunaActive.id)}>
                    {comunaActive.nombre}
                </Option>
            ))}
        </Select>


        <Input label='tu direccion' />
        <Select
            label="selecciona el metodo de pago"
            value={payment}
            minLength={5}
            maxLength={50}
            onChange={(value) => setPayment(value)}
        >
            <Option value='efectivo'>Efectivo</Option>
            <Option value='transferencia bancaria'>Transferencia Bancaria</Option>
        </Select>
        <ReCaptcha onVerify={handleCaptcha} />
        <Button type='submit' >Enviar</Button>
        {showError ===""?"hola soy igual": showError}
    </form>
    );
}

export default RegisterForm;
