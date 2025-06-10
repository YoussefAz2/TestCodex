import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useRouter } from 'next/router';

export default function AdminSettings() {
  const router = useRouter();
  const { restaurant_id } = router.query;
  const [settings, setSettings] = useState({ name: '', logo_url: '', tip_config: '', tax_config: '' });

  useEffect(() => {
    // TODO fetch current settings if needed
  }, [restaurant_id]);

  const handleSave = (e) => {
    e.preventDefault();
    fetch(`/api/restaurants/${restaurant_id}/settings`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    }).then(() => alert('saved'));
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Restaurant Settings</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <input className="border p-2 w-full" placeholder="Name" value={settings.name} onChange={e => setSettings({ ...settings, name: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Logo URL" value={settings.logo_url} onChange={e => setSettings({ ...settings, logo_url: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Tip config" value={settings.tip_config} onChange={e => setSettings({ ...settings, tip_config: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Tax config" value={settings.tax_config} onChange={e => setSettings({ ...settings, tax_config: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Save</button>
      </form>
    </AdminLayout>
  );
}
