import { Link } from 'react-router-dom';
import { Shield, Twitter, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  
  const footerLinks = {
    platform: [
      { name: t('footer.browseSchemes'), href: '/schemes' },
      { name: t('footer.howItWorks'), href: '/how-it-works' },
      { name: t('footer.aiVerification'), href: '/ai-verification' },
      { name: t('footer.voiceAssistant'), href: '/voice-assistant' },
    ],
    support: [
      { name: t('footer.helpCenter'), href: '/help' },
      { name: t('footer.contactUs'), href: '/contact' },
      { name: t('footer.faq'), href: '/faq' },
      { name: t('footer.privacyPolicy'), href: '/privacy' },
    ],
    resources: [
      { name: t('footer.governmentPortal'), href: 'https://india.gov.in' },
      { name: t('footer.officialSchemes'), href: 'https://www.myscheme.gov.in' },
      { name: t('footer.documentation'), href: '/docs' },
      { name: t('footer.apiAccess'), href: '/api' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black">
                SchemeConnect
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-6 text-black">{t('footer.platform')}</h3>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-600 hover:text-black transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-6 text-black">{t('footer.support')}</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-600 hover:text-black transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-6 text-black">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>support@schemeconnect.gov</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} SchemeConnect. {t('footer.copyright')}
          </p>
          <div className="flex space-x-8 text-sm">
            <Link 
              to="/privacy" 
              className="text-gray-600 hover:text-black transition-colors"
            >
              {t('footer.privacyPolicy')}
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-600 hover:text-black transition-colors"
            >
              {t('footer.termsOfService')}
            </Link>
            <Link 
              to="/cookies" 
              className="text-gray-600 hover:text-black transition-colors"
            >
              {t('footer.cookiePolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};