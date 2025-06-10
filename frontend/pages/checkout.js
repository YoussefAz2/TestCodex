import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import CartItem from '@/components/CartItem';
import { useCart } from '@/components/CartContext';

export default function CheckoutPage() {
  const { cart, setCart } = useCart();
  const [tip, setTip] = useState(0.15);
  const router = useRouter();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tipAmount = subtotal * tip;

  const submitOrder = async () => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, tip_amount: tipAmount })
    });
    const data = await response.json();
    setCart([]);
    router.push(`/confirmation?order_id=${data.id || ''}`);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Paiement</h1>
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="mt-4">
        <label className="block mb-2 font-semibold">Pourboire</label>
        <select
          value={tip}
          onChange={e => setTip(parseFloat(e.target.value))}
          className="border p-2 rounded w-full"
        >
          <option value={0.15}>15%</option>
          <option value={0.18}>18%</option>
          <option value={0.20}>20%</option>
          <option value={0.00}>0%</option>
        </select>
      </div>
      <div className="font-bold mt-4">Total: ${(subtotal + tipAmount).toFixed(2)}</div>
      <button
        onClick={submitOrder}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Payer maintenant
      </button>
    </Layout>
  );
}
