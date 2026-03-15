'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { LogIn, Eye, EyeOff } from 'lucide-react'
export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if(error) { setError('Invalid email or password.'); setLoading(false) }
    else { router.push('/admin/dashboard') }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0005]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-900/40 border border-yellow-500/30 flex items-center justify-center mx-auto mb-3">
            <span className="font-serif text-yellow-400 text-3xl font-bold">G</span>
          </div>
          <h1 className="font-display text-3xl text-gold-gradient">Geet Solutions</h1>
          <p className="text-yellow-100/40 text-sm tracking-widest uppercase mt-1">Admin Panel</p>
        </div>
        <div className="glass border border-yellow-500/20 p-8 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-yellow-500/30" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-yellow-500/30" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-yellow-500/30" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-yellow-500/30" />
          <h2 className="font-heading text-xl text-yellow-100/80 text-center mb-6">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-yellow-100/40 tracking-widest uppercase mb-2">Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@geetsolutions.in"
                className="w-full bg-red-900/20 border border-yellow-500/20 focus:border-yellow-500/50 text-yellow-100/80 px-4 py-3 text-sm outline-none transition-colors placeholder:text-yellow-100/20" />
            </div>
            <div>
              <label className="block text-xs text-yellow-100/40 tracking-widest uppercase mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full bg-red-900/20 border border-yellow-500/20 focus:border-yellow-500/50 text-yellow-100/80 px-4 py-3 pr-11 text-sm outline-none transition-colors placeholder:text-yellow-100/20" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-100/40 hover:text-yellow-400">
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            {error && <div className="p-3 bg-red-900/20 border border-red-700/40 text-red-400 text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 bg-red-900 hover:bg-red-800 border border-yellow-500/40 text-yellow-300 tracking-widest uppercase text-sm transition-all disabled:opacity-50 mt-2">
              <LogIn size={16}/>{loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}