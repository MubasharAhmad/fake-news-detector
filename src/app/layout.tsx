import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ weight: ["200", "300", "400", "500", "600", "700"], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fake News Detector',
  description: 'Website to detect fake news',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("relative min-h-screen flex flex-col justify-between font-sans antialiased grainy", poppins.className)}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
