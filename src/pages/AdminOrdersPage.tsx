import React, { useEffect, useState } from 'react';

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/admin/orders`)
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error('Erreur récupération commandes :', err));
    }, []);

    return (
        <div className="p-8 text-white" style={{ marginTop: "5%" }}>
            <h1 className="text-2xl font-bold mb-6">📦 Liste des commandes</h1>

            {orders.length === 0 ? (
                <p>Aucune commande pour le moment.</p>
            ) : (
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-neutral-800">
                        <th className="p-2 border border-neutral-700">Nom</th>
                        <th className="p-2 border border-neutral-700">Email</th>
                        <th className="p-2 border border-neutral-700">Téléphone</th>
                        <th className="p-2 border border-neutral-700">Adresse</th>
                        <th className="p-2 border border-neutral-700">Date</th>
                        <th className="p-2 border border-neutral-700">Total</th>
                        <th className="p-2 border border-neutral-700">Détails</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="bg-neutral-900">
                            <td className="p-2 border border-neutral-700">{order.name}</td>
                            <td className="p-2 border border-neutral-700">{order.email}</td>
                            <td className="p-2 border border-neutral-700">{order.phone}</td>
                            <td className="p-2 border border-neutral-700">{order.address}</td>
                            <td className="p-2 border border-neutral-700">
                                {new Date(order.createdAt).toLocaleString()}
                            </td>
                            <td className="p-2 border border-neutral-700 font-bold">
                                ${order.total.toFixed(2)}
                            </td>
                            <td className="p-2 border border-neutral-700">
                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
                                >
                                    Voir détails
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Modale */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-neutral-900 p-6 rounded shadow-lg w-[90%] max-w-lg">
                        <h2 className="text-xl font-bold mb-4">🧾 Détails de la commande</h2>
                        <ul className="list-disc ml-5 space-y-1">
                            {selectedOrder.items.map((item: any, idx: number) => (
                                <li key={idx}>
                                    {item.quantity} × {item.gloveJson?.size || 'Gant'} — ${item.price.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;
