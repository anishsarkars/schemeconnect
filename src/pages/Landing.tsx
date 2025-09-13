import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ShaderAnimation } from '@/components/ui/shader-animation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Landing() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Shader Animation Background */}
      <ShaderAnimation />
      
      {/* Background Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30 z-5"></div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Trust Badge */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium shadow-2xl">
              <span className="text-white">🛡️</span>
              <span className="text-white font-semibold">{t('landing.verifiedBadge')}</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-tight">
              {t('landing.mainTitle')}
            </h1>
            <p className="text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed">
              {t('landing.mainSubtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90 px-12 py-6 text-xl font-semibold rounded-full shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105" asChild>
              <Link to="/schemes">
                🔍 {t('landing.primaryCta')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl font-semibold rounded-full transition-all duration-300 backdrop-blur-sm shadow-xl hover:scale-105" asChild>
              <Link to="/fact-check">
                ✅ {t('landing.secondaryCta')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}