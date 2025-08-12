'use client'

import React from 'react'
import { Menu } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 rounded hover:bg-gray-100" aria-label="Open menu">
            <Menu size={20} />
          </button>
          <h1 className="text-base md:text-lg font-semibold"></h1>
        </div>

        <div className="flex items-center gap-4">
          <input
            placeholder="Search…"
            className="hidden md:block w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center">
            R
          </div>
        </div>
      </div>
    </header>
  )
}
