import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={cn("relative min-h-screen font-sans antialiased grainy", inter.className)}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
