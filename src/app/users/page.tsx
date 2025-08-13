'use client'

import React from 'react'
import {
  Search,
  PencilLine,
  ShieldCheck,
  Fingerprint,
  Globe2
} from 'lucide-react'


/* ---------- Types ---------- */
type Status = 'Active' | 'Inactive'
type StatusFilter = 'All' | Status

type User = {
  id: number
  name: string
  email: string
  status: Status
}

/* ---------- Page ---------- */
export default function UsersPage() {
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(true)

  // filters
  const [q, setQ] = React.useState<string>('') // name
  const [status, setStatus] = React.useState<StatusFilter>('All')

  // modal
  const [showCreate, setShowCreate] = React.useState(false)

  React.useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await fetch('/api/users', { cache: 'no-store' })
      const data: { users?: User[] } = await res.json()
      setUsers(data.users ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = React.useMemo(() => {
    const nameOk = (u: User) =>
      !q.trim() || u.name.toLowerCase().includes(q.trim().toLowerCase())
    const statusOk = (u: User) => status === 'All' || u.status === status
    return users.filter(u => nameOk(u) && statusOk(u))
  }, [users, q, status])

  return (
    <div className="space-y-6">
      {/* Filter card */}
      <section className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Name */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Enter Your Name"
                className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2
                           text-slate-900 placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusFilter)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2
                         text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Disable</option>
            </select>
          </div>

          {/* Search button (visual only for now) */}
          <div className="md:col-span-4">
            <button
              className="w-full h-[42px] rounded-lg text-white font-medium
                         bg-gradient-to-r from-indigo-600 to-slate-900
                         hover:opacity-95 transition inline-flex items-center justify-center gap-2"
              onClick={() => {/* filters already apply live */}}
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Admin Users card */}
      <section className="rounded-2xl bg-white shadow-sm border border-slate-200">
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-3xl font-semibold text-slate-800">Admin Users</h2>

          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 shadow
                       px-4 py-2 hover:bg-slate-50 transition"
          >
            <span className="grid place-items-center h-6 w-6 rounded-full bg-emerald-500 text-white text-lg leading-none">+</span>
            <span className="font-medium">Create Admin User</span>
          </button>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-y">
                <th className="py-3 px-5 w-16 text-left">SL</th>
                <th className="py-3 px-5 text-left">Name</th>
                <th className="py-3 px-5 text-left">Email</th>
                <th className="py-3 px-5 w-32 text-left">Status</th>
                <th className="py-3 px-5 w-[420px] text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center text-slate-500">Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-10 text-center text-slate-500">No users found.</td></tr>
              ) : (
                filtered.map((u, idx) => (
                  <tr key={u.id} className={`border-b last:border-0 ${idx % 2 ? 'bg-slate-50' : 'bg-white'}`}>
                    <td className="py-3 px-5">{idx + 1}</td>
                    <td className="py-3 px-5">{u.name}</td>
                    <td className="py-3 px-5">{u.email}</td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center gap-2 rounded-full text-xs font-semibold px-2.5 py-1
                        ${u.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-700'}`}>
                        <span className="h-2 w-2 rounded-full bg-current" />
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex flex-wrap gap-3">
                        <SoftButton onClick={() => alert(`Country settings for ${u.name}`)}>
                          <Globe2 size={16} />
                          Country
                        </SoftButton>
                        <SoftButton onClick={() => alert(`Permissions for ${u.name}`)}>
                          <ShieldCheck size={16} />
                          Permissions
                        </SoftButton>
                        <IconButton onClick={() => alert(`Edit ${u.name}`)}>
                          <PencilLine size={16} />
                        </IconButton>
                        <IconButton onClick={() => alert(`2FA for ${u.name}`)}>
                          <Fingerprint size={16} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 text-right text-sm text-slate-700">
          Total <span className="font-semibold">{filtered.length}</span> user(s) found.
        </div>
      </section>

      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreated={(newUser) => setUsers(prev => [newUser, ...prev])}
        />
      )}
    </div>
  )
}

/* ---------- Tiny UI helpers to match look ---------- */
function SoftButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400 text-gray-900 font-medium
                 shadow-sm hover:bg-amber-500 transition"
    >
      {children}
    </button>
  )
}

function IconButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Action"
      className="h-9 w-9 grid place-items-center rounded-lg bg-amber-400 text-gray-900 shadow-sm hover:bg-amber-500 transition"
    >
      {children}
    </button>
  )
}

/* ---------- Create User modal ---------- */
function CreateUserModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: (u: User) => void
}) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<Status>('Active')
  const [saving, setSaving] = React.useState(false)

  const canSave = name.trim().length > 0 && email.trim().length > 0

  const submit = async () => {
    if (!canSave) return
    setSaving(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, status }),
      })
      const data: { user?: User; error?: string } = await res.json()
      setSaving(false)

      if (res.ok && data.user) {
        onCreated(data.user)
        onClose()
      } else {
        alert(data.error ?? 'Failed to create user')
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
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 p-5">
        <h3 className="text-lg font-semibold mb-4">Create Admin User</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
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
