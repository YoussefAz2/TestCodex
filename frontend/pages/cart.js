import Layout from '@/components/Layout';
import CartItem from '@/components/CartItem';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/router';

export default function CartPage() {
  const { cart, setCart } = useCart();
  const router = useRouter();

  const removeItem = id => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const goToCheckout = () => router.push('/checkout');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Votre panier</h1>
      {cart.map(item => (
        <CartItem key={item.id} item={item} onRemove={() => removeItem(item.id)} />
      ))}
      <div className="text-right font-bold mt-4">Total: ${total.toFixed(2)}</div>
      <button
        onClick={goToCheckout}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Passer au paiement
      </button>
    </Layout>
  );
}
