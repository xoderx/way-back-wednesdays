import React, { useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { HeroSection } from '@/components/sections/HeroSection'
import { EventDetails } from '@/components/sections/EventDetails'
import { ActionHub } from '@/components/sections/ActionHub'
import { LivestreamSection } from '@/components/sections/LivestreamSection'
import { SocialMediaCenter } from '@/components/sections/SocialMediaCenter'
import { TextSignup } from '@/components/sections/TextSignup'
import { AppDownloadSection } from '@/components/sections/AppDownloadSection'
import { LoyaltyPromo } from '@/components/sections/LoyaltyPromo'
import { GallerySection } from '@/components/sections/GallerySection'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { ChatbotWidget } from '@/components/ChatbotWidget'
import { initPageView } from '@/lib/analytics'
export function HomePage() {
  useEffect(() => {
    initPageView('homepage_v17_dark_theatrical')
  }, [])
  return (
    <div className="relative min-h-screen bg-background transition-colors duration-500 overflow-hidden">
      {/* Global Visual Engine Overlays */}
      <div className="fixed inset-0 noise-bg pointer-events-none z-[100]" />
      <div className="fixed inset-0 scanlines pointer-events-none z-[101]" />
      <div className="fixed inset-0 vignette pointer-events-none z-[102]" />
      <SiteHeader />
      <main className="flex flex-col w-full relative z-10">
        {/* Floating Poster Stickers - High Contrast Anchor Points */}
        <div className="absolute top-[130vh] right-12 z-[20] poster-stamp w-32 h-32 border-hot-pink text-hot-pink -rotate-15 pointer-events-none hidden lg:flex bg-background/80 backdrop-blur-md shadow-lg border-4">
          <span className="text-[11px] font-black">21+ ONLY</span>
        </div>
        <div className="absolute top-[290vh] left-12 z-[20] poster-stamp w-36 h-36 border-neon-cyan text-neon-cyan rotate-12 pointer-events-none hidden lg:flex bg-background/80 backdrop-blur-md shadow-lg border-4">
          <span className="text-[11px] font-black">LIVE DJ SETS</span>
        </div>
        <div className="absolute top-[480vh] right-24 z-[20] poster-stamp w-40 h-40 border-retro-gold text-retro-gold -rotate-6 pointer-events-none hidden lg:flex bg-background/80 backdrop-blur-md shadow-lg border-4">
          <span className="text-[11px] font-black">VIP ELITE</span>
        </div>
        <HeroSection />
        <EventDetails />
        <ActionHub />
        <LivestreamSection />
        <LoyaltyPromo />
        <TextSignup />
        <SocialMediaCenter />
        <AppDownloadSection />
        <GallerySection />
      </main>
      <SiteFooter />
      <ChatbotWidget />
      {/* Custom Retro Toaster Overrides */}
      <Toaster
        richColors
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            border: '6px solid #FF59D6',
            color: 'hsl(var(--foreground))',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '950',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            borderRadius: '0',
            boxShadow: '8px 8px 0px hsla(var(--foreground), 0.1)',
            padding: '24px'
          }
        }}
      />
    </div>
  )
}