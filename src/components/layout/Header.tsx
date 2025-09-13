import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut, MessageCircle } from 'lucide-react';
import { VoiceAssistant } from '@/components/features/VoiceAssistant';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = false; // TODO: Connect to auth
  const { t } = useLanguage();

  const navigation = [
    { name: 'Solutions', href: '/schemes', current: location.pathname === '/schemes' },
    { name: 'Farm Management', href: '/farm-management', current: location.pathname === '/farm-management' },
    { name: 'Analytics', href: '/analytics', current: location.pathname === '/analytics' },
    { name: 'Contact', href: '/contact', current: location.pathname === '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M17.66 6.34l-4.24 4.24m0 0l-4.24 4.24m4.24-4.24L6.34 6.34m11.32 11.32l-4.24-4.24" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <span className="text-xl font-bold text-blue-900">
              Solar
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
                    ? 'text-black'
                    : 'text-gray-600 hover:text-black'
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
                <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
                  <Link to="/signup">Get a quote</Link>
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
                        <Button className="w-full border-gray-300 text-gray-700 hover:bg-gray-50" variant="outline" asChild>
                          <Link to="/signup" onClick={() => setIsOpen(false)}>Get a quote</Link>
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