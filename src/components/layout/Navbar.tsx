'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Comment ça marche', href: '#howit' },
  { label: 'Bornes', href: '#bornes' },
  { label: 'Confiance', href: '#testimonials' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-primary/95 backdrop-blur-xl shadow-lg py-3'
          : 'bg-primary py-4',
      )}
    >
      <nav className="w-full px-6 lg:px-10 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <a href="#hero" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden">
            <Image src="/images/logo.jpg" alt="LeMultiservice" fill className="object-cover" />
          </div>
          <span className="font-syne font-extrabold text-white text-lg tracking-tight">LeMultiservice</span>
        </a>

        {/* ── Nav links desktop — occupent toute la largeur ── */}
        <ul className="hidden md:flex items-center justify-center flex-1 gap-0">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href} className="flex-1 text-center">
              <a
                href={href}
                className="relative inline-block text-white/80 hover:text-white font-bold text-sm uppercase tracking-widest py-1 transition-colors group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-action transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* ── Hamburger mobile ── */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-primary p-1" aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* ── Menu mobile ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-primary/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-white/80 hover:text-white font-bold text-sm uppercase tracking-widest py-2 border-b border-white/10 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
