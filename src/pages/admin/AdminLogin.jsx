import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your admin email address first.");
      return;
    }
    try {
      await resetPassword(email);
      alert("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4 bg-slate-950">
      <div className="max-w-md w-full bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-ieee-blue/20 text-sky-400 rounded-2xl flex items-center justify-center mx-auto border border-ieee-blue/30 shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Admin Authentication</h2>
          <p className="text-xs text-slate-300 font-medium">Restricted portal for whitelisted chapter managers.</p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-600 text-rose-200 text-xs font-semibold flex items-start gap-2.5 shadow-md">
            <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-100 mb-1.5">Whitelisted Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vuggidisaivarshith@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-sm text-white placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-ieee-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-100 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-sm text-white placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-ieee-blue"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs text-sky-400 font-bold hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white bg-ieee-blue hover:bg-ieee-dark transition shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
