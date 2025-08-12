'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  UserCircle,
  MessageSquareText,
  Star,
  Tag,
  Handshake,
} from 'lucide-react'

const navItems = [
  { name: 'Users', href: '/users', icon: UserCircle },
  { name: 'Messages', href: '/messages', icon: MessageSquareText },
  { name: 'Testimonials', href: '/testimonials', icon: Star },
  { name: 'Offers', href: '/offers', icon: Tag },
  { name: 'Affiliation & Partners', href: '/affiliations', icon: Handshake },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="px-4 py-5">
        <h2 className="text-xl font-semibold text-black">Edumart Clone</h2>
      </div>
      <nav className="px-2 pb-6 space-y-1">
        {navItems.map(({ name, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              <span>{name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
