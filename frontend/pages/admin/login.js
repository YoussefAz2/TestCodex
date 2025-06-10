import { useState } from 'react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO connect to real auth
    if (password) {
      sessionStorage.setItem('admin_authed', '1');
      window.location.href = '/admin/menu';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow rounded">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
