import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('cookie_consent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      essential: true,
      analytics: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      essential: true,
      analytics: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const handleClose = () => {
    // If they close without choosing, treat as essential only
    handleAcceptEssential();
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            aria-label="Close cookie banner"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <Cookie className="w-8 h-8 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Cookie Consent</h3>
                <p className="text-gray-600 mb-4">
                  We use cookies to improve your experience and keep you logged in.
                  We use both essential and optional cookies.
                </p>
              </div>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-3 mb-6 bg-gray-50 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-not-allowed">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1 w-4 h-4 text-emerald-600 rounded"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Essential Cookies (Required)</div>
                  <div className="text-sm text-gray-600">
                    Required for login, security, and core app functionality. These cannot be disabled.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Analytics Cookies (Optional)</div>
                  <div className="text-sm text-gray-600">
                    Help us improve the app by collecting anonymized usage data. You can opt-out anytime.
                  </div>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
              >
                Accept All
              </button>
              <button
                onClick={handleAcceptEssential}
                className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Essential Only
              </button>
              <button
                onClick={() => navigate('/cookie-policy')}
                className="px-6 py-3 text-emerald-600 hover:text-emerald-700 transition font-medium underline"
              >
                Learn More
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By using Inner Voice, you agree to our use of cookies as described in our{' '}
              <button
                onClick={() => navigate('/cookie-policy')}
                className="text-emerald-600 hover:underline"
              >
                Cookie Policy
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
