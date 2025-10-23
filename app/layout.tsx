import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bangladesh Broadband Deals – Compare & Save',
  description: 'Compare fibre and wireless internet plans in Bangladesh. Find the best ISP deals in Dhaka, Chattogram, Sylhet and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">BD Broadband</Link>
            <div className="space-x-4 flex items-center">
              <Link href="/" className="hover:text-blue-200">Home</Link>
              <Link href="/browse-reviews" className="hover:text-blue-200">Browse Reviews</Link>
              <Link href="/compare" className="hover:text-blue-200">Compare</Link>
              <Link href="/providers" className="hover:text-blue-200">Providers</Link>
              <Link href="/deals" className="hover:text-blue-200">Deals</Link>
              <Link href="/tools" className="hover:text-blue-200">Tools</Link>
              <Link href="/submit" className="bg-white/10 px-3 py-1.5 rounded hover:bg-white/20 transition-colors">Submit Review</Link>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 BD Broadband. Built with Next.js & React.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
