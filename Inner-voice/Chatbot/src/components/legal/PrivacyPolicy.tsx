import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          {/* Data Controller Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Data Controller Information</h2>
            <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100">
              <p className="text-gray-700 mb-2"><strong>Data Controller:</strong> Inner Voice</p>
              <p className="text-gray-700 mb-2"><strong>Contact Email:</strong> privacy@innervoice.app</p>
              <p className="text-gray-700 mb-2"><strong>Support Email:</strong> support@innervoice.app</p>
              <p className="text-gray-700"><strong>Data Protection Officer:</strong> dpo@innervoice.app</p>
            </div>
          </section>

          {/* Legal Basis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Legal Basis for Processing (GDPR)</h2>
            <p className="text-gray-700 mb-4">
              We process your personal data based on the following legal grounds under GDPR Article 6:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Consent (Article 6(1)(a)):</strong> For optional features like mood tracking and analytics</li>
              <li><strong>Contract Performance (Article 6(1)(b)):</strong> To provide app services you've requested</li>
              <li><strong>Legitimate Interests (Article 6(1)(f)):</strong> For service improvement and security</li>
            </ul>
            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 mt-4">
              <p className="text-amber-900 font-semibold mb-2">Special Category Data (Article 9 - Health Data):</p>
              <p className="text-gray-700">
                We process mental health-related information (mood states, conversation topics) based on your
                <strong> EXPLICIT CONSENT</strong> only. You can withdraw consent at any time in your account settings.
              </p>
            </div>
          </section>

          {/* Data We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Data We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Data:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Email address (for account creation)</li>
              <li>Username</li>
              <li>Google OAuth data (if using Google login): name, email, profile picture</li>
              <li>IP address (for security and rate limiting)</li>
              <li>Device information (for technical support)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Conversation Data (Special Category - Health Data):</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Chat messages with AI characters</li>
              <li>Detected emotional states and mood trends</li>
              <li>Session timestamps and duration</li>
              <li>Character preferences</li>
            </ul>

            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-3">🔒 PRIVACY-FIRST DESIGN:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Conversation content is stored in temporary memory (Redis) for <strong>1 hour only</strong></li>
                <li>✓ Chat history is <strong>NOT permanently stored</strong> in our database</li>
                <li>✓ We do <strong>NOT sell, rent, or share</strong> your conversation data with third parties</li>
                <li>✓ All data is <strong>encrypted in transit</strong> (TLS/SSL) and at rest</li>
              </ul>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Retention Periods</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Data Type</th>
                    <th className="border border-gray-300 p-3 text-left">Retention Period</th>
                    <th className="border border-gray-300 p-3 text-left">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="border border-gray-300 p-3">Account Information</td>
                    <td className="border border-gray-300 p-3">Until account deletion</td>
                    <td className="border border-gray-300 p-3">Service provision</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3"><strong>Conversation History</strong></td>
                    <td className="border border-gray-300 p-3"><strong>1 hour (Redis TTL)</strong></td>
                    <td className="border border-gray-300 p-3">Real-time context only</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Usage Analytics</td>
                    <td className="border border-gray-300 p-3">90 days</td>
                    <td className="border border-gray-300 p-3">Service improvement</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Authentication Tokens</td>
                    <td className="border border-gray-300 p-3">24 hours (access), 30 days (refresh)</td>
                    <td className="border border-gray-300 p-3">Security</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Logs (error, security)</td>
                    <td className="border border-gray-300 p-3">30 days</td>
                    <td className="border border-gray-300 p-3">Technical support</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* User Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Privacy Rights (GDPR Articles 15-22)</h2>
            <div className="space-y-4">
              <div className="bg-white border border-emerald-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">✅ Right to Access (Article 15)</h3>
                <p className="text-gray-700">Request a copy of all your personal data we hold</p>
              </div>
              <div className="bg-white border border-emerald-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">✅ Right to Rectification (Article 16)</h3>
                <p className="text-gray-700">Correct inaccurate personal information</p>
              </div>
              <div className="bg-white border border-emerald-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">✅ Right to Erasure / "Right to be Forgotten" (Article 17)</h3>
                <p className="text-gray-700">Delete your account and all associated data</p>
              </div>
              <div className="bg-white border border-emerald-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">✅ Right to Data Portability (Article 20)</h3>
                <p className="text-gray-700">Receive your data in a machine-readable format (JSON/CSV)</p>
              </div>
              <div className="bg-white border border-emerald-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">✅ Right to Withdraw Consent (Article 7)</h3>
                <p className="text-gray-700">Withdraw consent for mood tracking or analytics at any time</p>
              </div>
            </div>
            <div className="mt-6 bg-emerald-50 rounded-lg p-6 border border-emerald-200">
              <p className="text-gray-700">
                <strong>To exercise your rights, email:</strong> privacy@innervoice.app<br />
                We will respond within <strong>30 days</strong> (GDPR requirement)
              </p>
            </div>
          </section>

          {/* Third-Party Processors */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Third-Party Processors</h2>
            <p className="text-gray-700 mb-4">We use the following processors with Data Processing Agreements (DPAs):</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Processor</th>
                    <th className="border border-gray-300 p-3 text-left">Purpose</th>
                    <th className="border border-gray-300 p-3 text-left">Data Shared</th>
                    <th className="border border-gray-300 p-3 text-left">Location</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="border border-gray-300 p-3">OpenAI</td>
                    <td className="border border-gray-300 p-3">Generate AI responses</td>
                    <td className="border border-gray-300 p-3">User messages, conversation context</td>
                    <td className="border border-gray-300 p-3">USA</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Redis Cloud</td>
                    <td className="border border-gray-300 p-3">Temporary conversation storage</td>
                    <td className="border border-gray-300 p-3">Chat history (1hr TTL)</td>
                    <td className="border border-gray-300 p-3">EU/USA</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">PostgreSQL (Cloud)</td>
                    <td className="border border-gray-300 p-3">User accounts, preferences</td>
                    <td className="border border-gray-300 p-3">Account data, settings</td>
                    <td className="border border-gray-300 p-3">EU region</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* International Transfers */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. International Data Transfers</h2>
            <p className="text-gray-700 mb-4">
              Your data may be transferred to and processed in countries outside the European Economic Area (EEA),
              including the United States.
            </p>
            <p className="text-gray-700 mb-4">We ensure adequate protection through:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>✅ Standard Contractual Clauses (SCCs) approved by EU Commission</li>
              <li>✅ Data Processing Agreements with all processors</li>
              <li>✅ Encryption in transit and at rest</li>
              <li>✅ Privacy Shield successor frameworks (where applicable)</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Information</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-2"><strong>Data Protection Inquiries:</strong> privacy@innervoice.app</p>
              <p className="text-gray-700 mb-2"><strong>Technical Support:</strong> support@innervoice.app</p>
              <p className="text-gray-700"><strong>Data Protection Officer:</strong> dpo@innervoice.app</p>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8 mt-8 text-center">
            <p className="text-sm text-gray-600">
              This privacy policy was last updated on {new Date().toLocaleDateString()}.
              We may update this policy from time to time, and will notify you of significant changes.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
            >
              Return to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
