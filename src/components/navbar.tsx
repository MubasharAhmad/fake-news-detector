"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()
    return (
        <nav className="fixed top-0 w-full z-30 bg-white/75 backdrop-blur-lg h-16 border-b border-gray-200 transition-all">
            <div className='container h-full flex justify-between items-center'>
                <p className='text-2xl font-semibold'>Fake News Detector</p>
                <div className='hidden sm:block'>
                    <Button variant="link" asChild>
                        <Link href="/" className={`${pathname === "/" ? "underline-offset-4 underline" : ""}`}>Home</Link>
                    </Button>
                    <Button variant="link" asChild>
                        <Link href="/news" className={`${pathname === "/news" ? "underline-offset-4 underline" : ""}`}>News</Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
