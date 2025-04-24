import React, { useState } from 'react';
import axios from 'axios';
// Ajusta la ruta a tu archivo de constantes o configuración
import { BASE_URL } from '../App';

function TrackOrder() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTrackOrder = async () => {
        // Reseteamos estados de respuesta previa
        setLoading(true);
        setError(null);
        setOrder(null);

        try {
            // Si tu backend filtra por query params, podrías hacer:
            // GET /api/pedidos/?tracking_number=<trackingNumber>
            // O si creaste una ruta específica: GET /api/pedidos/track/<trackingNumber>
            const response = await axios.get(
                `${BASE_URL}/api/pedidos/?tracking_number=${trackingNumber}`
            );

            // Si la respuesta es paginada, puede ser response.data.results[0]
            // o si esperas un pedido único, ajusta según tu lógica.
            if (response.data && response.data.results && response.data.results.length) {
                setOrder(response.data.results[0]);
            } else {
                setError('No se encontró un pedido con ese tracking.');
            }
        } catch (err) {
            setError('Ocurrió un error buscando el pedido.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (trackingNumber) {
            handleTrackOrder();
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Rastrear mi pedido</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    className="border rounded p-2"
                    type="text"
                    placeholder="Ingresa tu código de tracking"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
                    disabled={!trackingNumber || loading}
                >
                    {loading ? 'Buscando...' : 'Buscar pedido'}
                </button>
            </form>

            {error && (
                <p className="text-red-500 mt-4">
                    {error}
                </p>
            )}

            {order && (
                <div className="bg-gray-100 p-4 mt-4 rounded shadow">
                    <h2 className="font-semibold mb-2">Pedido encontrado</h2>
                    <p><strong>ID:</strong> {order.id}</p>
                    <p><strong>Estado:</strong> {order.estado}</p>
                    <p><strong>Fecha creación:</strong> {order.fecha_creacion}</p>
                    <p><strong>Tracking:</strong> {order.tracking_number}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                    {/* Si el backend retorna detalles en 'detalles_pedido': */}
                    {order.detalles_pedido && order.detalles_pedido.length > 0 && (
                        <div className="mt-2">
                            <p className="font-semibold">Detalles del pedido:</p>
                            <ul className="list-disc ml-6">
                                {order.detalles_pedido.map((detalle) => (
                                    <li key={detalle.id}>
                                        {detalle.item_type === 'producto'
                                            ? `Producto (ID: ${detalle.producto})`
                                            : `Servicio (ID: ${detalle.servicio})`
                                        }
                                        <span> x {detalle.cantidad} = $ {detalle.precio * detalle.cantidad}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TrackOrder;
