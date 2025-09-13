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
      
      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Trust Badge */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-blue-200 rounded-full text-sm font-medium shadow-lg">
              <span className="text-blue-600">🛡️</span>
              <span className="text-blue-800">{t('landing.verifiedBadge')}</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
              {t('landing.mainTitle')}
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('landing.mainSubtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl" asChild>
              <Link to="/schemes">
                🔍 {t('landing.primaryCta')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200" asChild>
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