import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Clock, MessageCircle, Lock, Brain, ChevronRight, Menu, X, Sparkles } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-hero-gradient overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-strong sticky top-0 z-50 border-b border-white/20"
      >
        <div className="container-max container-padding">
          <div className="flex justify-between items-center h-20">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/assets/avatars/sheep.svg" alt="Daisy" className="w-10 h-10" />
              <h1 className="text-2xl font-bold text-gray-800">Inner Voice</h1>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-link">Features</a>
              <a href="#characters" className="nav-link">Characters</a>
              <a href="#privacy" className="nav-link">Privacy</a>
              <motion.button
                onClick={() => navigate('/auth')}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 space-y-2"
            >
              <a href="#features" className="nav-link-mobile">Features</a>
              <a href="#characters" className="nav-link-mobile">Characters</a>
              <a href="#privacy" className="nav-link-mobile">Privacy</a>
              <button
                onClick={() => navigate('/auth')}
                className="w-full mt-4 btn-primary"
              >
                Get Started
              </button>
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* Character Showcase Section */}
      <section id="characters" className="section-padding bg-character-showcase relative overflow-hidden">
        <div className="container-max container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-gray-800 mb-4">
              Meet Your AI Companions
            </h2>
            <p className="text-lead max-w-3xl mx-auto">
              Choose from three unique personalities, each designed to provide emotional support in their own way.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Daisy Character Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-strong rounded-3xl p-8 bg-daisy-gradient hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center">
                <img src="/assets/avatars/sheep.svg" alt="Daisy" className="w-24 h-24 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Daisy</h3>
                <div className="badge badge-success mb-4">The Nurturer 🐑</div>
                <p className="text-gray-700 text-center mb-4">
                  Gentle, supportive, and comforting. Daisy provides warm emotional validation and daily check-ins.
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>✓ Emotional comfort</p>
                  <p>✓ Gentle guidance</p>
                  <p>✓ Warm validation</p>
                </div>
              </div>
            </motion.div>

            {/* Luna Character Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-strong rounded-3xl p-8 bg-luna-gradient hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center">
                <img src="/assets/avatars/rabbit.svg" alt="Luna" className="w-24 h-24 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Luna</h3>
                <div className="badge badge-info mb-4">The Thoughtful Worrier 🐰</div>
                <p className="text-gray-700 text-center mb-4">
                  Sensitive and empathetic. Luna specializes in anxiety support and coping strategies.
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>✓ Anxiety support</p>
                  <p>✓ Breathing exercises</p>
                  <p>✓ Worry management</p>
                </div>
              </div>
            </motion.div>

            {/* Zara Character Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-strong rounded-3xl p-8 bg-zara-gradient hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center">
                <img src="/assets/avatars/fox.svg" alt="Zara" className="w-24 h-24 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Zara</h3>
                <div className="badge badge-warning mb-4">The Clever Motivator 🦊</div>
                <p className="text-gray-700 text-center mb-4">
                  Smart and confident. Zara provides solution-focused guidance and motivation.
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>✓ Problem-solving</p>
                  <p>✓ Motivation boost</p>
                  <p>✓ Confidence building</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Get Started Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={() => navigate('/auth')}
              className="btn-primary text-lg px-12 py-5 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <p className="text-sm text-gray-600 mt-4">Free to start • No credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-brand-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="container-max container-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span className="text-sm font-medium text-gray-700">Private AI Companion</span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="heading-xl text-gray-800 mb-6 text-shadow-lg"
            >
              A Private Space for When You're{' '}
              <span className="gradient-text">Distressed</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lead mb-4"
            >
              Sometimes you need emotional support but don't want to involve friends or family.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-body mb-12"
            >
              Inner Voice provides a completely private, judgment-free space to express feelings and receive
              empathetic guidance—without the social complexities of human relationships.
            </motion.p>

            {/* What Inner Voice IS/IS NOT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="glass-strong rounded-3xl p-8 md:p-12 mb-8 text-left"
            >
              <h3 className="heading-sm text-gray-800 mb-6 text-center">What Inner Voice IS:</h3>
              <ul className="space-y-3 text-gray-700 mb-8">
                <motion.li
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <ChevronRight className="w-5 h-5 text-brand-600 flex-shrink-0 mt-1" />
                  <span>AI companion for daily emotional support and self-reflection</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <ChevronRight className="w-5 h-5 text-brand-600 flex-shrink-0 mt-1" />
                  <span>Available 24/7 when you need someone but not anyone you know</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <ChevronRight className="w-5 h-5 text-brand-600 flex-shrink-0 mt-1" />
                  <span>Completely private—conversations disappear after 1 hour</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <ChevronRight className="w-5 h-5 text-brand-600 flex-shrink-0 mt-1" />
                  <span>Evidence-based wellness techniques (CBT, mindfulness)</span>
                </motion.li>
              </ul>

              <h3 className="heading-sm text-gray-800 mb-6 text-center">What Inner Voice IS NOT:</h3>
              <ul className="space-y-3 text-gray-700">
                <motion.li
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-red-600 font-bold flex-shrink-0 text-xl">✗</span>
                  <span>A licensed therapist, counselor, or mental health professional</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-red-600 font-bold flex-shrink-0 text-xl">✗</span>
                  <span>A replacement for professional mental health care</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-red-600 font-bold flex-shrink-0 text-xl">✗</span>
                  <span>An emergency crisis intervention service</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-red-600 font-bold flex-shrink-0 text-xl">✗</span>
                  <span>Capable of providing medical advice or diagnoses</span>
                </motion.li>
              </ul>
            </motion.div>

            {/* Crisis Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-strong border-2 border-red-300/50 bg-red-50/50 rounded-3xl p-8 mb-12"
            >
              <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center gap-2 justify-center">
                <span className="text-2xl">🆘</span>
                If You Are Experiencing a Mental Health Crisis:
              </h3>
              <div className="text-left space-y-2 text-red-800 max-w-2xl mx-auto">
                <p><strong>National Suicide Prevention Lifeline:</strong> 988 (US)</p>
                <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
                <p><strong>UK - Samaritans:</strong> 116 123</p>
                <p><strong>China Mental Health Crisis Hotline:</strong> 400-161-9995</p>
                <p className="text-sm mt-4">
                  <a
                    href="https://www.iasp.info/resources/Crisis_Centres/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-700 underline hover:text-red-900 font-semibold"
                  >
                    International Crisis Centers Directory
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Case Section */}
      <section id="features" className="section-padding bg-white/30 backdrop-blur-sm relative">
        <div className="container-max container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-gray-800 mb-4">
              When You Need Support But...
            </h2>
            <p className="text-lead max-w-3xl mx-auto">
              Inner Voice is here for those moments when you need someone to talk to,
              but prefer not to involve the people in your life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "It's 3 AM and No One's Awake",
                description: "Get immediate emotional support anytime, without waiting for someone to be available.",
                delay: 0.1
              },
              {
                icon: Shield,
                title: "Don't Want to Burden Friends",
                description: "Express yourself freely without worrying about overwhelming or burdening your loved ones.",
                delay: 0.2
              },
              {
                icon: Lock,
                title: "Want to Process Privately First",
                description: "Sort through your emotions in complete privacy before deciding to talk to real people.",
                delay: 0.3
              },
              {
                icon: MessageCircle,
                title: "Need Judgment-Free Guidance",
                description: "Talk openly without fear of judgment, social consequences, or awkward explanations.",
                delay: 0.4
              },
              {
                icon: Brain,
                title: "Prefer No Social Consequences",
                description: "Keep your struggles private without risking relationships or your social reputation.",
                delay: 0.5
              },
              {
                icon: null,
                title: "Daily Emotional Check-Ins",
                description: "Regular emotional support without the social obligation of maintaining relationships.",
                delay: 0.6,
                customIcon: <img src="/assets/avatars/sheep.svg" alt="Daisy" className="w-12 h-12" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                className="feature-card"
              >
                {feature.customIcon ? feature.customIcon : React.createElement(feature.icon!, { className: "w-12 h-12 text-brand-600 mb-4" })}
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="section-padding bg-white/40 backdrop-blur-sm">
        <div className="container-max container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-gray-800 mb-4">
              Completely Private - No One Will Know You Used This
            </h2>
            <p className="text-lead max-w-3xl mx-auto">
              Your privacy and emotional wellbeing are our top priorities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {[
              {
                icon: Lock,
                title: "Temporary Conversations",
                description: "Your conversations are stored temporarily for context (1 hour only) and are NOT saved permanently. We believe your emotional moments should remain private.",
                delay: 0.1
              },
              {
                icon: Shield,
                title: "Never Sold or Shared",
                description: "We NEVER sell, rent, or share your emotional data with third parties. Your conversations stay between you and Inner Voice.",
                delay: 0.2
              },
              {
                icon: Lock,
                title: "GDPR Compliant",
                description: "Full compliance with GDPR and international privacy regulations. You have complete control over your data and can delete your account anytime.",
                delay: 0.3
              },
              {
                icon: Shield,
                title: "Encrypted & Secure",
                description: "All data is encrypted in transit (TLS/SSL) and at rest. Your emotional support conversations are protected with enterprise-grade security.",
                delay: 0.4
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                className="glass-strong rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              >
                {React.createElement(feature.icon, { className: "w-10 h-10 text-brand-600 mb-4" })}
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-700 mb-6 text-lg">
              Read our full privacy policy to understand how we protect your data:
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <motion.button
                onClick={() => navigate('/privacy-policy')}
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Privacy Policy
              </motion.button>
              <motion.button
                onClick={() => navigate('/terms-of-service')}
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Terms of Service
              </motion.button>
              <motion.button
                onClick={() => navigate('/cookie-policy')}
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cookie Policy
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-brand-600 via-emerald-600 to-teal-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="container-max container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="heading-lg text-white mb-6 text-shadow-lg">
              Ready for Private Emotional Support?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Join thousands who've found a safe space to express themselves without social pressure.
            </p>
            <motion.button
              onClick={() => navigate('/auth')}
              className="btn-secondary text-lg px-12 py-5 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started - It's Free
            </motion.button>
            <p className="text-sm text-white/80 mt-6">
              You must be at least 16 years old (18 in some countries) to use Inner Voice
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-16">
        <div className="container-max container-padding">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img src="/assets/avatars/sheep.svg" alt="Daisy" className="w-8 h-8" />
                <span className="text-white font-bold text-xl">Inner Voice</span>
              </div>
              <p className="text-sm text-gray-400">
                A private AI companion for when you're distressed and don't want friends involved.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="footer-heading">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => navigate('/privacy-policy')} className="footer-link">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/terms-of-service')} className="footer-link">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/cookie-policy')} className="footer-link">
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="footer-heading">Crisis Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>🆘 Suicide Prevention: 988 (US)</li>
                <li>🆘 Crisis Text Line: 741741</li>
                <li>🆘 UK Samaritans: 116 123</li>
                <li>🆘 China: 400-161-9995</li>
              </ul>
            </motion.div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-sm text-gray-400 mb-4">
                <strong className="text-gray-300">Reminder:</strong> Inner Voice is a private companion for emotional support,
                not a replacement for professional mental health care or human connection.
              </p>
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Inner Voice. All rights reserved.
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
