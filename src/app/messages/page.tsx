'use client'

import React, { useEffect, useState } from 'react'
import { COUNTRIES } from '@/lib/countries'
import { Search } from 'lucide-react'

type Message = {
  id: number
  date: string
  address: string
  mobile: string
  country: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState('All')

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/messages')
      const data = await res.json()
      setMessages(data.messages ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = selectedCountry === 'All'
    ? messages
    : messages.filter(m => m.country === selectedCountry)

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="bg-white p-5 rounded-xl border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              {COUNTRIES.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                         bg-gradient-to-r from-indigo-600 to-slate-800 text-white font-medium shadow
                         transition hover:opacity-95"
              onClick={() => {}}
              disabled
            >
              <Search size={18} />
              Searching…
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="px-5 pt-5">
          <h2 className="text-2xl font-semibold text-gray-800">Messages</h2>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 bg-gray-50 border-y">
                <th className="py-3 px-5 w-48">Date</th>
                <th className="py-3 px-5">Address</th>
                <th className="py-3 px-5 w-56">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="text-center py-10 text-gray-500">Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-10 text-gray-500">No messages found.</td></tr>
              ) : (
                filtered.map((m, i) => (
                  <tr key={m.id} className={`${i % 2 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                    <td className="py-3 px-5">{formatDate(m.date)}</td>
                    <td className="py-3 px-5">{m.address}</td>
                    <td className="py-3 px-5">{m.mobile}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 text-sm text-right text-gray-700">
          Total <span className="font-semibold">{filtered.length}</span> Message(s) found.
        </div>
      </div>
    </div>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const day = d.getDate()
  const month = d.toLocaleString('en-US', { month: 'short' })
  const year = String(d.getFullYear()).slice(-2)
  const suffix = getDaySuffix(day)
  return `${month} ${day}${suffix} ${year}`
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}
