'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  UsersRound, MessageSquareText, Quote, Gift, Building2, UserRound
} from 'lucide-react'

const links = [
  { name: 'Users', href: '/users', icon: UsersRound },
  { name: 'Messages', href: '/messages', icon: MessageSquareText },
  { name: 'Testimonials', href: '/testimonials', icon: Quote },
  { name: 'Offers', href: '/offers', icon: Gift },
  { name: 'Affiliation & Partners', href: '/affiliations', icon: Building2 },
]

export default function Topbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/users" className="flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 24 24" className="text-slate-800">
            <path d="M12 3L1 8l11 5 9-4.09V17h2V8L12 3Z" fill="currentColor" />
            <path d="M6 12v3c0 1.657 2.686 3 6 3s6-1.343 6-3v-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="leading-5">
            <div className="text-xl font-semibold">EduMart</div>
          </div>
        </Link>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-3">
          {links.map(({ name, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition
                  ${active ? 'bg-slate-100 text-slate-900 border border-slate-200'
                           : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <Icon size={18} />
                <span>{name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right profile pill */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-800 text-white grid place-items-center">
            <UserRound size={18} />
          </div>
        </div>
      </div>
    </header>
  )
}
