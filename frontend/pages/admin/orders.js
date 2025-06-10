import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useRouter } from 'next/router';

export default function AdminOrders() {
  const router = useRouter();
  const { restaurant_id } = router.query;
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    if (!restaurant_id) return;
    fetch(`/api/admin/orders?restaurant_id=${restaurant_id}`)
      .then(res => res.json())
      .then(data => setOrders(data.orders || []));
  };

  useEffect(() => {
    fetchOrders();
  }, [restaurant_id]);

  useEffect(() => {
    if (!restaurant_id) return;
    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${wsProtocol}://${window.location.host}/ws`);
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'order_updated' && msg.order.restaurant_id === Number(restaurant_id)) {
        fetchOrders();
      }
    };
    return () => ws.close();
  }, [restaurant_id]);

  const updateStatus = (id, status) => {
    fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_status: status })
    }).then(fetchOrders);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Commandes</h1>
      {orders.map(order => (
        <div key={order.id} className="bg-white p-4 rounded shadow mb-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Table {order.table_number}</p>
              <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleString()}</p>
              <p className="text-sm">Total: ${parseFloat(order.total_amount).toFixed(2)}</p>
              <p className="text-sm">Statut: {order.order_status}</p>
            </div>
            <div className="space-x-2">
              {order.order_status === 'pending' && (
                <button onClick={() => updateStatus(order.id, 'preparing')} className="bg-yellow-500 text-white px-2 py-1 rounded">Préparer</button>
              )}
              {order.order_status === 'preparing' && (
                <button onClick={() => updateStatus(order.id, 'ready')} className="bg-blue-500 text-white px-2 py-1 rounded">Prêt</button>
              )}
              {order.order_status === 'ready' && (
                <button onClick={() => updateStatus(order.id, 'served')} className="bg-green-600 text-white px-2 py-1 rounded">Servi</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </AdminLayout>
  );
}
