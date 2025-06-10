import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function ConfirmationPage() {
  const router = useRouter();
  const { order_id } = router.query;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Merci pour votre commande!</h1>
      {order_id && <p>Votre numéro de commande: <strong>{order_id}</strong></p>}
      <button
        onClick={() => router.push(`/menu?restaurant_id=${router.query.restaurant_id || ''}`)}
        className="mt-4 underline text-blue-600"
      >
        Retour au menu
      </button>
    </Layout>
  );
}
