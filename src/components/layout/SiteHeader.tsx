import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ThemeToggle'
import { trackEvent } from '@/lib/analytics'
export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'DETAILS', href: '#details' },
    { name: 'RSVP', href: '#rsvp' },
    { name: 'RESERVE', href: '#action-hub' },
    { name: 'LOYALTY', href: '#loyalty' },
    { name: 'APP', href: '#downloads' },
  ]
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    trackEvent('click', 'nav_logo_home')
  }
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled ? "h-16 md:h-20 glass-nav shadow-glow-soft py-2" : "h-20 md:h-24 bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full">
        <div className="flex justify-between items-center h-full">
          <div
            className="flex-shrink-0 flex flex-col md:flex-row md:items-center gap-0 md:gap-3 group cursor-pointer"
            onClick={handleHomeClick}
          >
            <div className="poster-headline text-xl sm:text-2xl lg:text-3xl transition-transform duration-300 group-hover:scale-[1.02] flex flex-wrap items-center">
              <span className="logo-gold mr-2">WAY BACK</span>
              <span className="logo-pink">WEDNESDAYS</span>
            </div>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 xl:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => trackEvent('click', `nav_${link.name.toLowerCase()}`)}
                className={cn(
                  "relative text-[9px] lg:text-[10px] font-black tracking-[0.3em] lg:tracking-[0.4em] text-foreground hover:text-neon-cyan transition-all duration-300 uppercase group",
                  link.name === 'RSVP' && "text-hot-pink bloom"
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 lg:-bottom-2 left-0 w-0 h-[2px] bg-neon-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <div className="pl-4 lg:pl-6 border-l border-foreground/20 flex items-center gap-3 lg:gap-4">
              <ThemeToggle className="relative top-0 right-0" />
            </div>
          </nav>
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle className="relative top-0 right-0" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neon-cyan p-2 bg-black/20 border-2 border-neon-cyan/40 hover:bg-neon-cyan hover:text-black transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Nav Overlay */}
      <div className={cn(
        "fixed inset-0 top-0 bg-background/98 backdrop-blur-[40px] z-[60] transition-all duration-500 md:hidden flex flex-col items-center justify-center p-10",
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}>
        <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-neon-cyan p-2 border-2 border-neon-cyan/20">
          <X size={32} />
        </button>
        <nav className="flex flex-col items-center space-y-8 w-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black italic uppercase tracking-tighter text-foreground hover:text-hot-pink transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="mt-16 poster-stamp w-32 h-32 border-hot-pink text-hot-pink animate-pulse">
          <span className="text-[10px] font-black">STL ROOFTOP</span>
        </div>
      </div>
    </header>
  )
}