import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="pointer-events-none absolute inset-0 opacity-60 gradient-hero animate-hero-gradient" />
          {/* subtle vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.9)_0%,transparent_70%)]" />
          <div className="ambient-rotate-gradient" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <div className="mx-auto rounded-2xl glass-card p-10 md:p-14 shadow-card-hover animate-fade-up relative overflow-hidden">
            <div className="hero-premium-glow" aria-hidden />
            <div className="hero-diagonal-bands" aria-hidden />
            <div className="flex items-center justify-center">
              <span className="pill px-3 py-1 text-sm text-muted-foreground inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" /> Trusted by 1000+ citizens
              </span>
            </div>
            <h1 className="text-center text-4xl md:text-6xl font-bold tracking-tight mt-6 leading-tight animate-fade-up" style={{animationDelay:'80ms'}}>
              From Chaos To Clarity—For Every
              <br />
              <span className="text-primary italic">Government Scheme</span>
            </h1>
            <p className="text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mt-6 animate-fade-up" style={{animationDelay:'140ms'}}>
              Automated eligibility, research prompts, and application-ready flows—built for everyone.
            </p>
            <div className="mt-8 flex justify-center gap-3 animate-fade-up" style={{animationDelay:'200ms'}}>
              <Button size="lg" asChild>
                <Link to="/schemes">
                  Generate My Workflow
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/schemes">
                  Explore Schemes
                </Link>
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 opacity-90 animate-fade-up" style={{animationDelay:'260ms'}}>
              {["Eligibility","Docs","Deadlines","Notifications","Support","Updates"].map((label) => (
                <div key={label} className="rounded-xl border bg-white/60 backdrop-blur p-3 text-center text-sm text-muted-foreground">
                  {label}
                </div>
              ))}
            </div>
            {/* Decorative fan of cards to mirror reference design */}
            <div className="relative mt-14 hidden md:block animate-fade-up" style={{animationDelay:'320ms'}} aria-hidden>
              <div className="h-[280px]" />
              {[
                {deg: -22, x: -240, radius: 26, dur: 9.2, from: 'hsla(221,83%,65%,0.9)', to: 'hsla(258,90%,66%,0.7)'},
                {deg: -14, x: -160, radius: 22, dur: 8.8, from: 'hsla(221,83%,53%,0.85)', to: 'hsla(258,90%,66%,0.6)'},
                {deg: -6, x: -80, radius: 18, dur: 8.4, from: 'hsla(0,0%,100%,0.9)', to: 'hsla(221,83%,53%,0.15)'},
                {deg: 0, x: 0, radius: 16, dur: 8.2, from: 'hsla(0,0%,100%,0.95)', to: 'hsla(221,83%,53%,0.12)'},
                {deg: 6, x: 80, radius: 18, dur: 8.4, from: 'hsla(0,0%,100%,0.9)', to: 'hsla(258,90%,66%,0.15)'},
                {deg: 14, x: 160, radius: 22, dur: 8.8, from: 'hsla(221,83%,53%,0.85)', to: 'hsla(258,90%,66%,0.6)'},
                {deg: 22, x: 240, radius: 26, dur: 9.2, from: 'hsla(221,83%,65%,0.9)', to: 'hsla(258,90%,66%,0.7)'}
              ].map((c, idx) => (
                <div
                  key={idx}
                  className="absolute left-1/2 bottom-0 w-40 h-56 rounded-2xl border shadow-card-hover animate-circular-float"
                  style={{
                    ['--base-x' as any]: `${c.x}px`,
                    ['--base-y' as any]: '20px',
                    ['--base-rot' as any]: `${c.deg}deg`,
                    ['--orbit-radius' as any]: `${c.radius}px`,
                    ['--orbit-duration' as any]: `${c.dur}s`,
                    ['--orbit-delay' as any]: `${120 + idx * 140}ms`,
                    transform: `translateX(${c.x + c.radius}px) translateY(20px) rotate(${c.deg}deg)`,
                    background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                    backdropFilter: 'blur(8px)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}