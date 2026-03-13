'use client'
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Services', href: 'services' },
  { label: 'Comment ça marche', href: 'howit' },
  { label: 'Bornes', href: 'bornes' },
  { label: 'Confiance', href: 'testimonials' },
]

/** Smooth-scroll to an element by id, with retries for lazy-rendered sections */
function scrollToSection(id: string) {
  const NAVBAR_HEIGHT = 72
  let attempts = 0

  const tryScroll = () => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
      window.scrollTo({ top, behavior: 'smooth' })
    } else if (++attempts < 20) {
      setTimeout(tryScroll, 150)
    }
  }

  tryScroll()
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  const handleNavClick = useCallback((id: string) => {
    setOpen(false)
    // Small delay so the mobile menu close animation doesn't fight the scroll
    setTimeout(() => scrollToSection(id), 100)
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
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 flex-shrink-0 bg-transparent border-0 cursor-pointer"
          aria-label="Accueil"
        >
          <div className="relative w-9 h-9 rounded-lg overflow-hidden">
            <Image src="/images/logo.jpg" alt="LeMultiservice" fill className="object-cover" />
          </div>
          <span className="font-syne font-extrabold text-white text-lg tracking-tight">LeMultiservice</span>
        </button>

        {/* ── Nav links desktop ── */}
        <ul className="hidden md:flex items-center justify-center flex-1 gap-0">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href} className="flex-1 text-center">
              <button
                onClick={() => handleNavClick(href)}
                className="relative inline-block text-white/80 hover:text-white font-bold text-sm uppercase tracking-widest py-1 transition-colors group bg-transparent border-0 cursor-pointer"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-action transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* ── Hamburger icon — WHITE ── */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-primary/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className="text-left text-white/80 hover:text-white active:text-action font-bold text-sm uppercase tracking-widest py-4 border-b border-white/10 transition-colors last:border-b-0 bg-transparent border-0 cursor-pointer w-full"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
