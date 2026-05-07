import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { api } from '@/lib/api-client'
import type { InquiryType } from '@shared/types'
import { trackEvent } from '@/lib/analytics'
import { Sparkles } from 'lucide-react'
const commonSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  message: z.string().optional(),
})
type FormData = z.infer<typeof commonSchema>
export function ActionHub() {
  const [activeTab, setActiveTab] = React.useState<InquiryType>('reservation')
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(commonSchema),
  })
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      const validTypes: Record<string, InquiryType> = {
        'reservation': 'reservation', 
        'loyalty-apply': 'loyalty', 
        'vendor-apply': 'vendor', 
        'sponsor-apply': 'sponsor', 
        'loyalty': 'loyalty'
      }
      if (validTypes[hash]) {
        setActiveTab(validTypes[hash]);
      }
      // Ensure we scroll to the section header if a deep link was used
      if (hash && validTypes[hash]) {
        const element = document.getElementById('action-hub');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])
  const triggerRetroConfetti = async () => {
    if (typeof window === 'undefined') return;
    try {
      const confettiModule = await import('canvas-confetti');
      const confetti = confettiModule.default;
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00B8D9', '#FF59D6', '#FFE25A', '#B026FF']
      });
    } catch (err) {
      console.warn('Failed to load confetti:', err);
    }
  }
  const onSubmit = async (data: FormData) => {
    try {
      await api('/api/inquiries', { method: 'POST', body: JSON.stringify({ ...data, type: activeTab }) })
      trackEvent('form_submit', `action_hub_${activeTab}`)
      await triggerRetroConfetti()
      toast.success('TRANSMISSION SUCCESS')
      reset()
    } catch (error) { toast.error('LINK FAILURE') }
  }
  const renderForm = (title: string) => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 md:space-y-10 glass-panel p-6 md:p-16 rounded-none border-4 border-foreground/20 relative overflow-hidden bg-background/40">
      <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles className="w-12 h-12 text-foreground" /></div>
      <h3 className="poster-headline text-3xl md:text-4xl mb-6 md:mb-10 text-foreground flex flex-wrap gap-2 md:gap-3">
        <span className="logo-gold">{title.split(' ')[0]}</span>
        <span className="text-foreground">{title.split(' ').slice(1).join(' ')}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/90">IDENTITY PROTOCOL</label>
          <Input {...register('name')} placeholder="FULL NAME" disabled={isSubmitting} className="h-14 md:h-16 bg-black/30 border-2 border-foreground/20 focus:border-neon-cyan focus:ring-4 focus:ring-neon-cyan/20 font-black tracking-widest text-foreground placeholder:text-foreground/50 rounded-none transition-all" />
          {errors.name && <p className="text-[10px] text-hot-pink font-bold uppercase">{errors.name.message}</p>}
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/90">COMMUNICATION UPLINK</label>
          <Input {...register('email')} placeholder="ENCRYPTED EMAIL" disabled={isSubmitting} className="h-14 md:h-16 bg-black/30 border-2 border-foreground/20 focus:border-neon-cyan focus:ring-4 focus:ring-neon-cyan/20 font-black tracking-widest text-foreground placeholder:text-foreground/50 rounded-none transition-all" />
          {errors.email && <p className="text-[10px] text-hot-pink font-bold uppercase">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/90">MOBILE FREQUENCY</label>
        <Input {...register('phone')} placeholder="PHONE NUMBER" disabled={isSubmitting} className="h-14 md:h-16 bg-black/30 border-2 border-foreground/20 focus:border-neon-cyan focus:ring-4 focus:ring-neon-cyan/20 font-black tracking-widest text-foreground placeholder:text-foreground/50 rounded-none transition-all" />
        {errors.phone && <p className="text-[10px] text-hot-pink font-bold uppercase">{errors.phone.message}</p>}
      </div>
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/90">ADDITIONAL DATA PARAMS</label>
        <Textarea {...register('message')} placeholder="VIBE REQUIREMENTS / TABLE REQUESTS" disabled={isSubmitting} className="bg-black/30 border-2 border-foreground/20 focus:border-neon-cyan focus:ring-4 focus:ring-neon-cyan/20 font-black tracking-widest text-foreground placeholder:text-foreground/50 min-h-[120px] md:min-h-[150px] rounded-none transition-all" />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full h-16 md:h-20 bg-gradient-to-br from-hot-pink via-vivid-lavender to-neon-purple text-white font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-lg md:text-xl shadow-extrude-purple shadow-glow-soft active:scale-95 transition-all rounded-none border-2 border-white/20">
        {isSubmitting ? 'PROCESSING...' : 'SEND TO ROOFTOP'}
      </Button>
    </form>
  )
  return (
    <section id="action-hub" className="bg-background py-24 md:py-32 relative scroll-mt-24 overflow-hidden border-b border-foreground/10">
      {/* Scroll Anchors for Deep Links */}
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="poster-headline text-4xl md:text-8xl py-4 flex justify-center gap-4 flex-wrap">
            <span className="logo-gold">INITIATE</span>
            <span className="text-foreground chromatic-aberration">ENGAGEMENT</span>
          </h2>
          <div className="h-1 w-24 md:w-32 bg-hot-pink mx-auto mb-6 shadow-glow-soft" />
        </div>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as InquiryType)} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-black/20 border-2 border-foreground/10 h-auto p-1 md:p-2 mb-8 md:mb-12 rounded-none">
            <TabsTrigger value="reservation" className="py-4 md:py-5 font-black uppercase tracking-widest text-[10px] md:text-xs text-foreground/70 data-[state=active]:bg-neon-cyan data-[state=active]:text-black rounded-none">TABLES</TabsTrigger>
            <TabsTrigger value="loyalty" className="py-4 md:py-5 font-black uppercase tracking-widest text-[10px] md:text-xs text-foreground/70 data-[state=active]:bg-neon-cyan data-[state=active]:text-black rounded-none">MEMBERSHIP</TabsTrigger>
            <TabsTrigger value="vendor" className="py-4 md:py-5 font-black uppercase tracking-widest text-[10px] md:text-xs text-foreground/70 data-[state=active]:bg-neon-cyan data-[state=active]:text-black rounded-none">VENDORS</TabsTrigger>
            <TabsTrigger value="sponsor" className="py-4 md:py-5 font-black uppercase tracking-widest text-[10px] md:text-xs text-foreground/70 data-[state=active]:bg-neon-cyan data-[state=active]:text-black rounded-none">PARTNERS</TabsTrigger>
          </TabsList>
          <div className="min-h-[600px] md:min-h-[700px]">
            <TabsContent value="reservation" className="mt-0">{renderForm('TABLE BOOKING')}</TabsContent>
            <TabsContent value="loyalty" className="mt-0">{renderForm('WBW CARD ACCESS')}</TabsContent>
            <TabsContent value="vendor" className="mt-0">{renderForm('VIBE CURATOR APPLICATION')}</TabsContent>
            <TabsContent value="sponsor" className="mt-0">{renderForm('PARTNER PROTOCOL')}</TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  )
}