import { useState } from 'react';

export default function AdminMenuItemCard({ item, onUpdated }) {
  const [form, setForm] = useState(item);
  const [editing, setEditing] = useState(false);

  const save = () => {
    fetch(`/api/restaurants/${item.restaurant_id}/menu_items/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(onUpdated);
    setEditing(false);
  };

  const remove = () => {
    fetch(`/api/restaurants/${item.restaurant_id}/menu_items/${item.id}`, { method: 'DELETE' }).then(onUpdated);
  };

  if (editing) {
    return (
      <div className="bg-white shadow p-4 rounded mb-4">
        <input className="border p-1 mb-2 w-full" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border p-1 mb-2 w-full" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input className="border p-1 mb-2 w-full" type="number" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} />
        <label className="flex items-center mb-2"><input type="checkbox" className="mr-2" checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })} />Available</label>
        <button onClick={save} className="bg-blue-600 text-white px-3 py-1 rounded mr-2">Save</button>
        <button onClick={() => setEditing(false)} className="text-gray-600">Cancel</button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span>${item.price.toFixed(2)}</span>
        <div>
          <button onClick={() => setEditing(true)} className="mr-2 text-blue-600">Edit</button>
          <button onClick={remove} className="text-red-600">Delete</button>
        </div>
      </div>
    </div>
  );
}
