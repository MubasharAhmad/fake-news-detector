"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

const Navbar = () => {
    const pathname = usePathname()
    return (
        <nav className="fixed top-0 w-full z-30 bg-white/75 backdrop-blur-lg h-16 border-b border-gray-200 transition-all">
            <div className='container h-full flex justify-between items-center'>
                <div className='flex'>
                    <Image src="/logo.png" width={32} height={32} className="inline-block mr-2" alt="logo"></Image>
                    <p className='text-2xl font-semibold'>
                        Fake News Detector
                    </p>
                </div>
                <div className='hidden sm:block'>
                    <Button variant="link" asChild>
                        <Link href="/" className={`${pathname === "/" ? "underline-offset-4 underline" : "text-black"}`}>Home</Link>
                    </Button>
                    <Button variant="link" asChild>
                        <Link href="/news" className={`${pathname === "/news" ? "underline-offset-4 underline" : "text-black"}`}>News</Link>
                    </Button>
                    <Button variant="link" asChild>
                        <Link href="/detect-news" className={`${pathname === "/detect-news" ? "underline-offset-4 underline" : "text-black"}`}>Detect News</Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
