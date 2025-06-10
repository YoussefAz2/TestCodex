export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
      </div>
      <div className="flex items-center space-x-4">
        <span>${(item.price * item.quantity).toFixed(2)}</span>
        {onRemove && (
          <button onClick={onRemove} className="text-red-600">Supprimer</button>
        )}
      </div>
    </div>
  );
}
