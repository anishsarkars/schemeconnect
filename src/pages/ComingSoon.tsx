import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Mail, Bell } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="text-center shadow-card">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold mb-2">{title}</CardTitle>
              <CardDescription className="text-base">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                We're working hard to bring you this feature. Stay tuned for updates!
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Bell className="w-4 h-4" />
                <span>Get notified when it's ready</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              
              <Button className="flex-1" asChild>
                <Link to="/schemes">
                  Browse Schemes
                </Link>
              </Button>
            </div>
            
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Questions? Contact us at{' '}
                <a href="mailto:support@schemeconnect.gov" className="text-primary hover:underline">
                  support@schemeconnect.gov
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}