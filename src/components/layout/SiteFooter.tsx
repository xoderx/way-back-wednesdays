import React from 'react'
import { QrCode, ArrowUp } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('click', 'back_to_top');
  };
  return (
    <footer className="bg-background border-t-8 border-hot-pink pt-32 pb-16 relative overflow-hidden">
      <div className="absolute -top-1 right-1/4 w-32 h-10 tape-effect opacity-50 rotate-3" />
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Sponsor Spotlight */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left max-w-5xl mx-auto glass-panel p-10 border-2 border-neon-cyan/30 rounded-3xl shadow-extrude-purple bg-background">
          <div className="space-y-6">
            <span className="text-hot-pink font-black text-xs font-bold tracking-[0.4em] uppercase bloom">COMMUNITY PARTNERS</span>
            <h3 className="poster-headline text-4xl md:text-6xl !shadow-none py-2 text-foreground">SPONSOR <span className="text-neon-cyan">SPOTLIGHT</span></h3>
            <p className="text-vivid-lavender font-bold uppercase tracking-tight text-sm opacity-90">Way Back Wednesdays is made possible by our incredible local partners. Support the businesses that support the vibe.</p>
            <div className="flex flex-wrap gap-4 opacity-40">
              {['MOONRISE', 'DELMAR', 'STL_PRIDE', 'URBAN_VIBE'].map(s => (
                <span key={s} className="text-[10px] font-black text-foreground uppercase tracking-tighter border border-current px-2">{s}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 justify-end p-2">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground mb-1">SCAN FOR THIS WEEK'S</p>
              <p className="text-2xl font-black text-neon-cyan italic uppercase tracking-tighter bloom">SPONSOR SPECIALS</p>
            </div>
            <a
              href="/api/qr/sponsor"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click', 'footer_sponsor_qr')}
              className="p-4 bg-background/80 backdrop-blur-sm border-4 border-hot-pink shadow-extrude-pink hover:scale-105 transition-transform group"
            >
              <div className="w-32 h-32 flex items-center justify-center relative bg-white">
                <QrCode className="w-full h-full text-black" />
              </div>
              <p className="mt-2 text-[9px] font-black text-black text-center tracking-tighter uppercase italic">ENCRYPTED PARTNER LINK</p>
            </a>
          </div>
        </div>
        <div className="mb-16">
          <h2 className="poster-headline text-5xl md:text-[8rem] leading-[0.8] mb-12">
            SPREAD THE <br />
            <span className="text-foreground chromatic-aberration">WORD.</span>
          </h2>
          <button
            onClick={scrollToTop}
            className="poster-stamp w-20 h-20 border-hot-pink text-hot-pink mx-auto flex flex-col hover:bg-hot-pink hover:text-white"
          >
            <ArrowUp className="w-6 h-6 mb-1" />
            <span className="text-[8px]">TOP</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-muted-foreground font-black text-xs tracking-[0.2em] mb-24 uppercase">
          <div className="space-y-4">
            <h4 className="text-foreground border-b-2 border-hot-pink pb-2 w-fit mx-auto md:mx-0">LOCATION</h4>
            <p className="text-foreground font-black">MOONRISE HOTEL ROOFTOP</p>
            <p className="text-foreground/80">6177 DELMAR BLVD</p>
            <p className="text-foreground/80">ST. LOUIS, MO 63112</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-foreground border-b-2 border-hot-pink pb-2 w-fit mx-auto md:mx-0">CONNECT</h4>
            <p className="hover:text-hot-pink cursor-pointer transition-colors" onClick={() => trackEvent('click', 'social_insta')}>INSTAGRAM</p>
            <p className="hover:text-hot-pink cursor-pointer transition-colors" onClick={() => trackEvent('click', 'social_fb')}>FACEBOOK</p>
            <p className="hover:text-hot-pink cursor-pointer transition-colors" onClick={() => trackEvent('click', 'social_x')}>TWITTER</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-foreground border-b-2 border-hot-pink pb-2 w-fit mx-auto md:mx-0">INQUIRIES</h4>
            <p className="text-foreground font-black">INFO@WAYBACKWEDNESDAYS.COM</p>
            <p className="text-foreground/80">BOOKINGS@WAYBACKWEDNESDAYS.COM</p>
          </div>
        </div>
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.4em] font-black uppercase text-muted-foreground/50 border-t border-foreground/10">
          <p>© 2025 WAY BACK WEDNESDAYS. BUILT FOR THE STL SKYLINE.</p>
          <p>ST. LOUIS' PREMIER ROOFTOP EXPERIENCE</p>
        </div>
      </div>
    </footer>
  )
}