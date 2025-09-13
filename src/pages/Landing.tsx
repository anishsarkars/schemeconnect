import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white" style={{
      backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
      backgroundSize: '24px 24px'
    }}>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Trust Badge */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-medium shadow-sm">
              <span className="text-green-600">✅</span>
              <span className="text-green-800">Verified by AI Fact-Check</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-blue-900 mb-8 leading-tight">
              One Platform. Every Government Scheme.<br />Zero Misinformation.
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover verified government schemes — upcoming, active, and past — all in one place. Powered by AI to cut through misinformation and connect citizens with the benefits they truly deserve.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg" asChild>
              <Link to="/schemes">
                👉 Explore Verified Schemes
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200" asChild>
              <Link to="/schemes">
                👉 Check Your Eligibility
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}