import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function AdminLogin({ onAuth }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check stored password on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('admin_password');
    if (stored) {
      verifyPassword(stored);
    }
  }, []);

  const verifyPassword = async (pw) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/auth`, {
        method: 'POST',
        headers: { 'x-admin-password': pw },
      });
      if (res.ok) {
        sessionStorage.setItem('admin_password', pw);
        onAuth(pw);
      } else {
        setError('Invalid password');
        sessionStorage.removeItem('admin_password');
      }
    } catch {
      setError('Connection error');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) return;
    verifyPassword(password);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6" data-testid="admin-login-page">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors mb-8"
          data-testid="admin-back-link"
        >
          <ArrowLeft size={16} />
          Back to site
        </button>

        <div className="bg-[#121212] rounded-2xl border border-white/5 p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
              <Lock size={22} className="text-[#3B82F6]" />
            </div>
          </div>
          <h1 className="font-['Poppins'] text-xl font-bold text-white text-center mb-1">Admin Access</h1>
          <p className="text-sm text-[#888] text-center mb-6">Enter your admin password</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#3B82F6]/50 transition-colors"
              data-testid="admin-password-input"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs" data-testid="admin-login-error">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3B82F6] text-white py-3 rounded-full font-semibold text-sm hover:bg-blue-600 transition-all disabled:opacity-50"
              data-testid="admin-login-submit"
            >
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
