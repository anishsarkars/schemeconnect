import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Mail, Bell } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="modern-card text-center">
          <CardHeader className="space-y-6">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-black" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold mb-3 text-black">{title}</CardTitle>
              <CardDescription className="text-base text-gray-600 leading-relaxed">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                {t('comingSoon.workingHard')}
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Bell className="w-4 h-4" />
                <span>{t('comingSoon.getNotified')}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1 modern-button-outline" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('comingSoon.backToHome')}
                </Link>
              </Button>
              
              <Button className="flex-1 modern-button" asChild>
                <Link to="/schemes">
                  {t('comingSoon.browseSchemes')}
                </Link>
              </Button>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                {t('comingSoon.questions')}{' '}
                <a href="mailto:support@schemeconnect.gov" className="text-black hover:underline">
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