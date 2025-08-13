'use client'

import React, { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { COUNTRIES, Country } from '@/lib/countries'

type Message = {
  id: number
  date: string
  address: string
  mobile: string
  country: string
}

const SEED: Message[] = [
  {
    id: 1,
    date: '2025-08-08',
    address: 'Pakistan House#03 street E 5 irfanabad tramri chowk Islamabad',
    mobile: '03348740854',
    country: 'Pakistan',
  },
  {
    id: 2,
    date: '2025-07-31',
    address: 'United Kingdom 69 Wellington Drive',
    mobile: '07403040313',
    country: 'United Kingdom',
  },
  {
    id: 3,
    date: '2022-10-14',
    address: 'Bangladesh Dhaka,Bangladesh',
    mobile: '01724047997',
    country: 'Bangladesh',
  },
  {
    id: 4,
    date: '2022-09-29',
    address: 'United Kingdom 120',
    mobile: '07448108279',
    country: 'United Kingdom',
  },
]

const PAGE_SIZE = 10

export default function MessagesPage() {
  const [country, setCountry] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const onSearch = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 300)) // mimic API delay
    setPage(1)
    setLoading(false)
  }

  const filtered: Message[] = useMemo(() => {
    if (!country || country === 'All') return SEED
    return SEED.filter((m) => m.country === country)
  }, [country])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const rows = filtered.slice(start, start + PAGE_SIZE)

  return (
    <div className="space-y-6">
      {/* Filter */}
      <section className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Country</option>
              <option value="All">All</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.country}>
                  {c.country}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4">
            <button
              onClick={onSearch}
              disabled={loading}
              className="w-full h-[42px] rounded-lg text-white font-medium bg-gradient-to-r from-indigo-600 to-slate-900 hover:opacity-95 transition inline-flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <Search size={18} />
              {loading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-2xl bg-white shadow-sm border border-slate-200">
        <div className="px-6 pt-6">
          <h2 className="text-3xl font-semibold text-slate-800">Messages</h2>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-y">
                <th className="py-3 px-5 w-48 text-left">Date</th>
                <th className="py-3 px-5 text-left">Address</th>
                <th className="py-3 px-5 w-56 text-left">Mobile number</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-slate-500">
                    No messages found.
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((m, i) => (
                  <tr key={m.id} className={`border-b last:border-0 ${i % 2 ? 'bg-slate-50' : 'bg-white'}`}>
                    <td className="py-3 px-5">{formatDate(m.date)}</td>
                    <td className="py-3 px-5">{m.address}</td>
                    <td className="py-3 px-5">{m.mobile}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="inline-flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-9 w-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50"
              aria-label="Previous page"
            >
              ‹
            </button>
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-white text-sm font-semibold">{page}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-9 w-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50"
              aria-label="Next page"
            >
              ›
            </button>
          </div>

          <div className="text-sm text-slate-700">
            Total <span className="font-semibold">{total}</span> Message(s) found.
          </div>
        </div>
      </section>
    </div>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const day = d.getDate()
  const month = d.toLocaleString('en-US', { month: 'short' })
  const year = String(d.getFullYear()).slice(-2)
  return `${month} ${day}${getDaySuffix(day)} ${year}`
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) return 'th'
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
