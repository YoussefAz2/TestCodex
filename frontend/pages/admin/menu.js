import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminMenuItemCard from '@/components/AdminMenuItemCard';
import { useRouter } from 'next/router';

export default function AdminMenu() {
  const router = useRouter();
  const { restaurant_id } = router.query;
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!restaurant_id) return;
    fetch(`/api/public/restaurants/${restaurant_id}/menu`)
      .then(res => res.json())
      .then(data => setItems(data.menu || []));
  }, [restaurant_id]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Menu management</h1>
      {items.map(item => (
        <AdminMenuItemCard key={item.id} item={item} onUpdated={() => {
          fetch(`/api/public/restaurants/${restaurant_id}/menu`)
            .then(res => res.json())
            .then(data => setItems(data.menu || []));
        }} />
      ))}
    </AdminLayout>
  );
}
