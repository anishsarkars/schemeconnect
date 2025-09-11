import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  Mic, 
  Bell, 
  CheckCircle, 
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
  Play
} from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

export default function Landing() {
  const features = [
    {
      icon: Shield,
      title: 'AI-Verified Schemes',
      description: 'All schemes are verified by AI for authenticity and accuracy',
      color: 'text-primary'
    },
    {
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Ask questions in Hindi or English about government schemes',
      color: 'text-secondary'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get notified about new schemes matching your interests',
      color: 'text-accent'
    },
    {
      icon: Search,
      title: 'Advanced Filtering',
      description: 'Find schemes by category, location, and eligibility criteria',
      color: 'text-primary'
    }
  ];

  const stats = [
    { label: 'Active Schemes', value: '50+', icon: TrendingUp },
    { label: 'Verified Programs', value: '98%', icon: CheckCircle },
    { label: 'Beneficiaries Helped', value: '2M+', icon: Users },
    { label: 'Response Time', value: '<2s', icon: Clock }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-20 sm:py-24 lg:py-32">
          <div className="max-w-4xl text-center mx-auto space-y-8">
            <Badge variant="secondary" className="mx-auto bg-white/10 text-white border-white/20 backdrop-blur-sm">
              🚀 AI-Powered Government Scheme Discovery
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-lg">
              Discover Government 
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Schemes Easily
              </span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl drop-shadow-md">
              Find, verify, and apply for government schemes with AI assistance. 
              Real-time updates, voice search, and personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/schemes">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Schemes
                </Link>
              </Button>
              
              <Button size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
                <Link to="/demo">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mx-auto">Features</Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why Choose SchemeConnect?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Advanced AI technology meets government transparency to bring you 
              the most reliable scheme discovery platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-card-hover transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-background mb-4 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Find Your Perfect Scheme?
            </h2>
            <p className="mx-auto max-w-2xl text-white/80 text-lg">
              Join thousands of citizens who have already benefited from government schemes 
              through our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="xl" asChild>
                <Link to="/schemes">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}