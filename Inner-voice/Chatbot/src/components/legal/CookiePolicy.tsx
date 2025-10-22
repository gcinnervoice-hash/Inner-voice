import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';

export function CookiePolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <img src="/assets/avatars/sheep.svg" alt="Daisy" className="w-6 h-6" />
            <h1 className="text-xl font-bold text-gray-800">Inner Voice</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-10 h-10 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-800">Cookie Policy</h1>
          </div>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files stored on your device when you visit our website. They help us
              provide you with a better experience by remembering your preferences and keeping you logged in.
            </p>
            <p className="text-gray-700">
              This Cookie Policy explains what cookies we use, why we use them, and how you can manage them.
            </p>
          </section>

          {/* Cookie Categories */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types of Cookies We Use</h2>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-green-900 mb-3">
                  ✅ Essential Cookies (Required)
                </h3>
                <p className="text-gray-700 mb-4">
                  These cookies are necessary for the app to function and cannot be disabled in our systems.
                  Without these cookies, core features like login and security would not work.
                </p>
                <p className="text-gray-700 font-medium">What they do:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
                  <li>Keep you logged in to your account</li>
                  <li>Remember your character and theme preferences</li>
                  <li>Protect your account with security features</li>
                  <li>Enable basic app functionality</li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  📊 Analytics Cookies (Optional)
                </h3>
                <p className="text-gray-700 mb-4">
                  These cookies help us understand how users interact with Inner Voice so we can improve
                  the experience. All data is anonymized and never linked to your conversations.
                </p>
                <p className="text-gray-700 font-medium">What they do:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
                  <li>Track page views and navigation patterns</li>
                  <li>Measure feature usage to prioritize improvements</li>
                  <li>Identify technical issues and bugs</li>
                  <li>Understand user demographics (age, location)</li>
                </ul>
                <p className="text-sm text-blue-800 mt-3 font-medium">
                  You can opt-out of analytics cookies at any time.
                </p>
              </div>
            </div>
          </section>

          {/* Cookie Table */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detailed Cookie List</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Cookie Name</th>
                    <th className="border border-gray-300 p-3 text-left">Purpose</th>
                    <th className="border border-gray-300 p-3 text-left">Type</th>
                    <th className="border border-gray-300 p-3 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {/* Essential Cookies */}
                  <tr className="bg-green-50">
                    <td colSpan={4} className="border border-gray-300 p-3 font-semibold">
                      Essential Cookies
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3"><code>auth_token</code></td>
                    <td className="border border-gray-300 p-3">Keep you logged in</td>
                    <td className="border border-gray-300 p-3">Essential</td>
                    <td className="border border-gray-300 p-3">24 hours</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3"><code>refresh_token</code></td>
                    <td className="border border-gray-300 p-3">Renew your session automatically</td>
                    <td className="border border-gray-300 p-3">Essential</td>
                    <td className="border border-gray-300 p-3">30 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3"><code>session_id</code></td>
                    <td className="border border-gray-300 p-3">Track conversation sessions</td>
                    <td className="border border-gray-300 p-3">Essential</td>
                    <td className="border border-gray-300 p-3">Session</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3"><code>character_pref</code></td>
                    <td className="border border-gray-300 p-3">Remember your preferred character</td>
                    <td className="border border-gray-300 p-3">Essential</td>
                    <td className="border border-gray-300 p-3">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3"><code>theme_pref</code></td>
                    <td className="border border-gray-300 p-3">Remember your theme choice</td>
                    <td className="border border-gray-300 p-3">Essential</td>
                    <td className="border border-gray-300 p-3">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3"><code>cookie_consent</code></td>
                    <td className="border border-gray-300 p-3">Remember your cookie preferences</td>
                    <td className="border border-gray-300 p-3">Essential</td>
                    <td className="border border-gray-300 p-3">1 year</td>
                  </tr>

                  {/* Analytics Cookies */}
                  <tr className="bg-blue-50">
                    <td colSpan={4} className="border border-gray-300 p-3 font-semibold">
                      Analytics Cookies (Optional)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3"><code>_ga</code></td>
                    <td className="border border-gray-300 p-3">Google Analytics - distinguish users</td>
                    <td className="border border-gray-300 p-3">Analytics</td>
                    <td className="border border-gray-300 p-3">2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3"><code>_gid</code></td>
                    <td className="border border-gray-300 p-3">Google Analytics - distinguish users</td>
                    <td className="border border-gray-300 p-3">Analytics</td>
                    <td className="border border-gray-300 p-3">24 hours</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3"><code>_gat</code></td>
                    <td className="border border-gray-300 p-3">Google Analytics - throttle request rate</td>
                    <td className="border border-gray-300 p-3">Analytics</td>
                    <td className="border border-gray-300 p-3">1 minute</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              We may use third-party services that set their own cookies. These include:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Google Analytics (Optional)</h3>
                <p className="text-gray-700 text-sm">
                  If you consent to analytics cookies, Google Analytics helps us understand how users
                  interact with our app. Google's use of data is governed by their{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    Privacy Policy
                  </a>.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Google OAuth (Essential)</h3>
                <p className="text-gray-700 text-sm">
                  If you sign in with Google, Google may set cookies to maintain your authentication
                  session. This is essential for Google login to function.
                </p>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Manage Cookies</h2>

            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                <h3 className="text-lg font-semibold text-emerald-900 mb-3">
                  1. Through Inner Voice Settings
                </h3>
                <p className="text-gray-700 mb-3">
                  You can manage your cookie preferences directly in the app:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                  <li>Go to Settings (gear icon in sidebar)</li>
                  <li>Click "Privacy" tab</li>
                  <li>Toggle "Analytics Cookies" on or off</li>
                  <li>Changes take effect immediately</li>
                </ol>
                <p className="text-sm text-emerald-800 mt-3 font-medium">
                  Note: Essential cookies cannot be disabled as they're required for the app to function.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  2. Through Your Browser Settings
                </h3>
                <p className="text-gray-700 mb-3">
                  Most web browsers allow you to control cookies through settings:
                </p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                  </li>
                  <li>
                    <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Privacy, search, and services → Cookies
                  </li>
                </ul>
                <p className="text-sm text-amber-800 mt-3 font-medium">
                  ⚠️ Warning: Blocking all cookies may prevent Inner Voice from functioning properly.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">
                  3. Opt-Out of Google Analytics
                </h3>
                <p className="text-gray-700 mb-3">
                  You can opt-out of Google Analytics tracking across all websites by installing the{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 font-semibold hover:underline"
                  >
                    Google Analytics Opt-Out Browser Add-on
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy & Data Protection</h2>
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <p className="text-gray-700 mb-3">
                <strong>Important:</strong> Cookies do NOT store your conversation content. Your chat messages
                with AI characters are:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>🔒 Stored temporarily in encrypted Redis cache (1 hour only)</li>
                <li>🔒 NOT saved permanently in our database</li>
                <li>🔒 NEVER accessible through cookies</li>
                <li>🔒 Completely separate from cookie data</li>
              </ul>
              <p className="text-gray-700 mt-4">
                For more information about how we protect your data, see our{' '}
                <button
                  onClick={() => navigate('/privacy-policy')}
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  Privacy Policy
                </button>.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions About Cookies?</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-2">
                If you have questions about our use of cookies, please contact us:
              </p>
              <p className="text-gray-700 font-medium">privacy@innervoice.app</p>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <p className="text-sm text-gray-600 text-center mb-6">
              This cookie policy was last updated on {new Date().toLocaleDateString()}.
              We may update this policy from time to time to reflect changes in our practices or legal requirements.
            </p>
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
