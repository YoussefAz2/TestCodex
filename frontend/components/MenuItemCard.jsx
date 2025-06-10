export default function MenuItemCard({ item, onAdd }) {
  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      {item.photo_url && (
        <img src={item.photo_url} alt={item.name} className="w-full h-40 object-cover rounded" />
      )}
      <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold">${item.price.toFixed(2)}</span>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
