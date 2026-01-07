import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      // Show banner after 7 seconds for a less sudden appearance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gold shadow-lg animate-slide-up">
      <div className="container-custom py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Cookie style={{ width: '24px', height: '24px' }} className="text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Cookie Consent
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={rejectCookies}
              className="px-6 py-2 text-navy border border-navy rounded-lg hover:bg-navy hover:text-white transition-all duration-300 font-medium"
            >
              Reject All
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-gold text-navy rounded-lg hover:bg-gold-dark transition-all duration-300 font-medium"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
