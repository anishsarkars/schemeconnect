import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ShaderAnimation } from '@/components/ui/shader-animation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Landing() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Shader Animation Background */}
      <ShaderAnimation />
      
      {/* Background Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20 z-5"></div>
      
      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Trust Badge */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-sm border border-blue-200 rounded-full text-sm font-medium shadow-2xl">
              <span className="text-blue-600">🛡️</span>
              <span className="text-blue-800 font-semibold">{t('landing.verifiedBadge')}</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-tight drop-shadow-2xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
              {t('landing.mainTitle')}
            </h1>
            <p className="text-xl text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
              {t('landing.mainSubtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-2xl transition-all duration-200 hover:shadow-3xl backdrop-blur-sm" asChild>
              <Link to="/schemes">
                🔍 {t('landing.primaryCta')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 backdrop-blur-sm shadow-xl" asChild>
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