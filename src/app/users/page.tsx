'use client'

import React from 'react'
import { Plus, Search, ShieldCheck, PencilLine, Fingerprint } from 'lucide-react'


type User = {
  id: number
  name: string
  email: string
  status: 'Active' | 'Inactive'
}

export default function UsersPage() {
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(true)
  const [q, setQ] = React.useState('')
  const [status, setStatus] = React.useState<'All' | 'Active' | 'Inactive'>('All')
  const [showCreate, setShowCreate] = React.useState(false)

  React.useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await fetch('/api/users', { cache: 'no-store' })
      const data = await res.json()
      setUsers(data.users ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = users.filter(u => {
    const matchesName = q.trim() === '' || u.name.toLowerCase().includes(q.toLowerCase())
    const matchesStatus = status === 'All' || u.status === status
    return matchesName && matchesStatus
  })

  return (
    <div className="space-y-5">
      {/* Filters and Create */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
              <input
  placeholder="Enter a name"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-white
             text-gray-900 placeholder-gray-500
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
/>
            </div>
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
  value={status}
  onChange={(e) => setStatus(e.target.value as 'All' | 'Active' | 'Inactive')}
  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white
             text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
>

              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="md:col-span-3 flex md:justify-end">
            <button
  onClick={() => setShowCreate(true)}
  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg 
             !bg-blue-600 text-white font-medium shadow-md 
             transition-all duration-200 
             hover:!bg-blue-700 hover:scale-105 active:scale-95"
>
  <Plus size={18} />
  Create Admin User
</button>



          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-5 pt-5">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Users</h2>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-y bg-gray-50">
                <th className="py-3 px-5 w-16">SL</th>
                <th className="py-3 px-5">Name</th>
                <th className="py-3 px-5">Email</th>
                <th className="py-3 px-5 w-32">Status</th>
                <th className="py-3 px-5 w-[360px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="py-8 text-center text-gray-500">Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-gray-500">No users found.</td></tr>
              ) : (
                filtered.map((u, idx) => (
                  <tr key={u.id} className={`border-b last:border-0 ${idx % 2 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="py-3 px-5">{idx + 1}</td>
                    <td className="py-3 px-5 font-medium text-gray-900">{u.name}</td>
                    <td className="py-3 px-5 text-gray-700">{u.email}</td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                      }`}>
                        <span className="h-2 w-2 rounded-full bg-current" />
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex flex-wrap gap-2">
                        <SoftButton onClick={() => alert(`Permissions for ${u.name}`)}><ShieldCheck size={16}/> Permissions</SoftButton>
                        <IconButton onClick={() => alert(`Edit ${u.name}`)}><PencilLine size={16} /></IconButton>
                        <IconButton onClick={() => alert(`2FA for ${u.name}`)}><Fingerprint size={16} /></IconButton>
                      </div>
                      
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-sm text-gray-600">
            Total <span className="font-semibold">{filtered.length}</span> user(s) found.
          </div>
        </div>
      </div>

      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreated={(u) => setUsers(prev => [u, ...prev])}
        />
      )}
    </div>
  )
}

/* ------- Tiny UI helpers ------- */

function SoftButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-amber-100 text-amber-900 px-3 py-1.5 font-medium shadow-sm hover:bg-amber-200 transition"
    >
      {children}
    </button>
  )
}

function IconButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-lg bg-amber-400 text-amber-950 h-9 w-9 shadow-sm hover:bg-amber-500 transition"
      aria-label="Action"
    >
      {children}
    </button>
  )
}

/* ------- Create User modal ------- */

function CreateUserModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: (u: User) => void
}) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'All' | 'Active' | 'Inactive'>('Active')
  const [saving, setSaving] = React.useState(false)
  const canSave = name.trim() && email.trim()

  const submit = async () => {
  if (!canSave) return
  setSaving(true)

  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, status }),
    })

    const data = await res.json()
    console.log('API response:', data)

    setSaving(false)

    if (res.ok && data.user) {
      onCreated(data.user)
      onClose()
    } else {
      alert(data.error || 'Failed to create user')
    }
  } catch (error) {
  const err = error as Error
  console.error('Error submitting user:', err.message)
  alert(`Request failed: ${err.message}`)
  setSaving(false)
}
}


  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-5">
        <h3 className="text-lg font-semibold mb-4">Create Admin User</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'All' | 'Active' | 'Inactive')}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!canSave || saving}
            onClick={submit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}
