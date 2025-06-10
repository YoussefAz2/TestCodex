import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white p-4 flex space-x-4">
        <Link href="/admin/menu" className="hover:underline">Menu</Link>
        <Link href="/admin/settings" className="hover:underline">Settings</Link>
      </nav>
      <main className="p-4 max-w-2xl mx-auto">
        {children}
      </main>
    </div>
  );
}
