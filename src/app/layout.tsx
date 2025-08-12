import '@/app/globals.css'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

export const metadata = {
  title: 'Edumart Clone',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-50">
          <Topbar />
          <div className="p-6">{children}</div>
        </main>
      </body>
    </html>
  )
}
