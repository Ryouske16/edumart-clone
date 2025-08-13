import '@/app/globals.css'
import Topbar from '@/components/Topbar'

export const metadata = { title: 'EduMart Admin' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-gray-900">
        <Topbar />
        <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
      </body>
    </html>
  )
}
