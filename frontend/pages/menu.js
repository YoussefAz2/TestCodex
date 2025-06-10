import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import MenuItemCard from '@/components/MenuItemCard';
import { useCart } from '@/components/CartContext';

export default function MenuPage() {
  const router = useRouter();
  const { restaurant_id } = router.query;
  const [menu, setMenu] = useState([]);
  const { cart, setCart } = useCart();

  useEffect(() => {
    if (!restaurant_id) return;
    fetch(`/api/public/restaurants/${restaurant_id}/menu`)
      .then(res => res.json())
      .then(data => setMenu(data.menu || []));
  }, [restaurant_id]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      {menu.map(mi => (
        <MenuItemCard key={mi.id} item={mi} onAdd={() => addToCart(mi)} />
      ))}
    </Layout>
  );
}
