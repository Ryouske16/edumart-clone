'use client'

import React from 'react'
import {
  Search,
  PencilLine
} from 'lucide-react'
import Image from 'next/image'



/* ---------- Types ---------- */
type PubStatus = 'Published' | 'Unpublished'
type StatusFilter = 'All' | PubStatus

type Testimonial = {
  id: number
  photoUrl?: string | null
  text: string
  youtube: string
  status: PubStatus
}

/* ---------- Seed (swap to API later) ---------- */
const SEED: Testimonial[] = [
  {
    id: 1,
    text: 'This is test',
    youtube: 'https://www.youtube.com/embed/YPCQkPXAyrU',
    status: 'Unpublished',
    photoUrl: null,
  },
]

const PAGE_SIZE = 10

export default function TestimonialsPage() {
  const [status, setStatus] = React.useState<StatusFilter>('All')
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [rowsAll] = React.useState<Testimonial[]>(SEED)

  const onSearch = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 300)) // mimic request
    setPage(1)
    setLoading(false)
  }

  const rowsFiltered = React.useMemo(() => {
    if (status === 'All') return rowsAll
    return rowsAll.filter(t => t.status === status)
  }, [rowsAll, status])

  const total = rowsFiltered.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageRows = rowsFiltered.slice(start, start + PAGE_SIZE)

  return (
    <div className="space-y-6">
      {/* Filter card */}
      <section className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusFilter)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2
                         text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">Select Status</option>
              <option value="Published">Active</option>
              <option value="Unpublished">Disable</option>
            </select>
          </div>

          <div className="md:col-span-4">
            <button
              onClick={onSearch}
              disabled={loading}
              className="w-full h-[42px] rounded-lg text-white font-medium
                         bg-gradient-to-r from-indigo-600 to-slate-900
                         hover:opacity-95 transition inline-flex items-center justify-center gap-2
                         disabled:opacity-70"
            >
              <Search size={18} />
              {loading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </div>
      </section>

      {/* Table card */}
      <section className="rounded-2xl bg-white shadow-sm border border-slate-200">
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-3xl font-semibold text-slate-800">Testimonials</h2>

          <button
            className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 shadow
                       px-4 py-2 hover:bg-slate-50 transition"
            onClick={() => alert('Open Create Testimonial modal')}
          >
            <span className="grid place-items-center h-6 w-6 rounded-full bg-emerald-500 text-white text-lg leading-none">+</span>
            <span className="font-medium">Create Testimonial</span>
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-y">
                <th className="py-3 px-5 w-16 text-left">SL</th>
                <th className="py-3 px-5 w-28 text-left">Photo</th>
                <th className="py-3 px-5 text-left">Text</th>
                <th className="py-3 px-5 text-left">Youtube link</th>
                <th className="py-3 px-5 w-40 text-left">status</th>
                <th className="py-3 px-5 w-24 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="py-10 text-center text-slate-500">Loading…</td></tr>
              )}

              {!loading && pageRows.length === 0 && (
                <tr><td colSpan={6} className="py-10 text-center text-slate-500">No testimonials found.</td></tr>
              )}

              {!loading && pageRows.map((t, i) => (
                <tr key={t.id} className={`border-b last:border-0 ${i % 2 ? 'bg-slate-50' : 'bg-white'}`}>
                  <td className="py-3 px-5">{start + i + 1}</td>

                  {/* Photo */}
                  <td className="py-3 px-5">
                    <div className="h-12 w-16 flex items-center">
                      {t.photoUrl ? (
                        // use next/image later if you want
                        <Image
  src={t.photoUrl}
  alt="photo"
  width={48}
  height={48}
  className="h-12 w-12 rounded bg-slate-200 object-cover"
/>
                      ) : (
                        <div className="h-12 w-12 rounded bg-slate-200 grid place-items-center">
                          {/* silhouette icon */}
                          <svg viewBox="0 0 24 24" width="24" height="24" className="text-slate-500">
                            <path fill="currentColor" d="M12 12a5 5 0 100-10 5 5 0 000 10Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Text */}
                  <td className="py-3 px-5">{t.text}</td>

                  {/* Youtube link */}
                  <td className="py-3 px-5">
                    <a
                      href={t.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 hover:underline break-all"
                    >
                      {t.youtube}
                    </a>
                  </td>

                  {/* Status badge */}
                  <td className="py-3 px-5">
                    {t.status === 'Published' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                        Unpublished
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-5">
                    <button
                      onClick={() => alert(`Edit testimonial #${t.id}`)}
                      className="h-9 w-9 grid place-items-center rounded-lg bg-amber-400 text-gray-900 shadow-sm hover:bg-amber-500 transition"
                      aria-label="Edit"
                    >
                      <PencilLine size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: pager + total */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="inline-flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-9 w-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50"
              aria-label="Previous page"
            >
              ‹
            </button>
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-white text-sm font-semibold">
              {page}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-9 w-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50"
              aria-label="Next page"
            >
              ›
            </button>
          </div>

          <div className="text-sm text-slate-700">
            Total <span className="font-semibold">{total}</span> testimonial(s) found.
          </div>
        </div>
      </section>
    </div>
  )
}
