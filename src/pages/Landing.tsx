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
          {/* News Banner */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-50 border border-amber-200 rounded-full text-sm font-medium shadow-sm">
              <span className="text-amber-700">News</span>
              <span className="text-gray-800">Smart Irrigation System Launch</span>
              <ArrowUpRight className="h-4 w-4 text-amber-600" />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-blue-900 mb-8 leading-tight">
              Autonomy for<br />every Farm
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing agriculture with AI-powered sensors, drones, and automation for sustainable and efficient farming.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-16">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg" asChild>
              <Link to="/schemes">
                Automate now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}