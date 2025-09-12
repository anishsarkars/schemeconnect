import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="pointer-events-none absolute inset-0 opacity-60 gradient-hero" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <div className="mx-auto rounded-2xl glass-card p-10 md:p-14 shadow-card-hover">
            <div className="flex items-center justify-center">
              <span className="pill px-3 py-1 text-sm text-muted-foreground inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" /> Trusted by 1000+ citizens
              </span>
            </div>
            <h1 className="text-center text-4xl md:text-6xl font-bold tracking-tight mt-6">
              From Chaos To Clarity—For Every
              <br />
              <span className="text-primary">Government Scheme</span>
            </h1>
            <p className="text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mt-6">
              Automated eligibility, research prompts, and application-ready flows—built for everyone.
            </p>
            <div className="mt-8 flex justify-center gap-3">
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
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 opacity-90">
              {["Eligibility","Docs","Deadlines","Notifications","Support","Updates"].map((label) => (
                <div key={label} className="rounded-xl border bg-white/60 backdrop-blur p-3 text-center text-sm text-muted-foreground">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}