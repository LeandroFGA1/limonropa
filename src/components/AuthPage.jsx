import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api";
const AuthPage = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData);
      setMessage(`Login exitoso: ${response.data.message}`);
    } catch (error) {
      setMessage(`Error en login: ${error.response.data.message}`);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/register`, registerData);
      setMessage(`Registro exitoso: ${response.data.message}`);
    } catch (error) {
      setMessage(`Error en registro: ${error.response.data.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login y Registro
        </h2>
        {message && (
          <p className="text-center text-green-500 mb-4">{message}</p>
        )}

        <form onSubmit={handleLoginSubmit} className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Login</h3>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={loginData.username}
            onChange={handleLoginChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={loginData.password}
            onChange={handleLoginChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>

        <form onSubmit={handleRegisterSubmit}>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Registro</h3>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={registerData.username}
            onChange={handleRegisterChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={registerData.email}
            onChange={handleRegisterChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={registerData.password}
            onChange={handleRegisterChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-200"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
