import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../App';

function ClientOrderPage() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.accessToken);
    const isLoggedIn = !!token;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/access');
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/pedidos/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data.results || response.data);
            } catch (err) {
                setError('Ocurrió un error al cargar los pedidos.');
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchOrders();
        }
    }, [isLoggedIn, token]);

    if (loading) {
        return <div>Cargando pedidos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!orders.length) {
        return <div>No tienes pedidos registrados.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Mis Pedidos</h1>
            {orders.map((pedido) => (
                <div key={pedido.id} className="mb-4 border rounded-md p-4">
                    <p><strong>ID Pedido:</strong> {pedido.id}</p>
                    <p><strong>Fecha de creación:</strong> {pedido.fecha_creacion}</p>
                    <p><strong>Estado:</strong> {pedido.estado}</p>
                    <p><strong>Pagado:</strong> {pedido.pagado ? 'Sí' : 'No'}</p>
                    <p><strong>Total:</strong> ${pedido.total}</p>
                    <p><strong>Dirección de envío:</strong> {pedido.direccion_envio}</p>
                    {/* Si quieres mostrar detalles, podrían venir en la misma respuesta
              y se llamarían 'detalles_pedido' según tu serializer */}
                    {pedido.detalles_pedido && pedido.detalles_pedido.length > 0 && (
                        <div className="mt-2">
                            <p className="font-semibold">Detalles:</p>
                            <ul className="list-disc ml-5">
                                {pedido.detalles_pedido.map((detalle) => (
                                    <li key={detalle.id}>
                                        {detalle.item_type === 'producto' ? (
                                            `Producto: ${detalle.producto} | Cantidad: ${detalle.cantidad} | Precio: $${detalle.precio}`
                                        ) : (
                                            `Servicio: ${detalle.servicio} | Cantidad: ${detalle.cantidad} | Precio: $${detalle.precio}`
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ClientOrderPage;
