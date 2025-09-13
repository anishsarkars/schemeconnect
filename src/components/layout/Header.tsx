import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut, MessageCircle, Shield } from 'lucide-react';
import { VoiceAssistant } from '@/components/features/VoiceAssistant';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = false; // TODO: Connect to auth
  const { t } = useLanguage();

  const navigation = [
    { name: 'Schemes Search', href: '/schemes', current: location.pathname === '/schemes' },
    { name: 'Fact Checker', href: '/fact-check', current: location.pathname === '/fact-check' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              SchemeConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  item.current
                    ? 'text-gray-900'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Voice Assistant & Auth */}
          <div className="flex items-center space-x-3">
            <VoiceAssistant />
            <LanguageToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
                  <User className="h-4 w-4 mr-2" />
                  {t('nav.profile')}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-gray-600 hover:text-black border-gray-300" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="mt-6 space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                        item.current
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="px-4 py-2">
                      <LanguageToggle />
                    </div>
                    {!isAuthenticated && (
                      <>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                        </Button>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                          <Link to="/signup" onClick={() => setIsOpen(false)}>Get Started</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};