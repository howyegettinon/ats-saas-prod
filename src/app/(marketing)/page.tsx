import SparklesHero from '@/components/hero/SparklesHero';
import { ChevronRight, Check, Star } from 'lucide-react';
import { ClientMotion } from '@/components/motion/ClientMotion';

const features = [
  {
    title: "Keyword Optimization",
    description: "Identifies missing keywords using GPT-5 analysis",
    icon: <Star className="h-6 w-6 text-blue-600" />
  },
  {
    title: "ATS Score Tracking",
    description: "Real-time tracking of compatibility score",
    icon: <Star className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Formatting Analysis",
    description: "Checks headers and readability",
    icon: <Star className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Competency Matching",
    description: "Aligns experience with requirements",
    icon: <Star className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Cover Letter Generator",
    description: "AI-powered letter creation",
    icon: <Star className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Unlimited Revisions",
    description: "Version control tracking",
    icon: <Star className="h-6 w-6 text-blue-600" />
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CVGenius
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
                Success Stories
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a 
                href="/login" 
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Sign in
              </a>
              <a
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                Get Started
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <ClientMotion 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-32 pb-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ClientMotion
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className=""
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Resume with <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI-Powered ATS Optimization
                </span>
              </h1>
            </ClientMotion>
            
            <ClientMotion
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className=""
            >
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Beat applicant tracking systems and land 3x more interviews using our GPT-5 powered analysis engine. 
                Trusted by 15,000+ job seekers worldwide.
              </p>
            </ClientMotion>

            <SparklesHero />
          </div>
        </div>
      </ClientMotion>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Optimization Tools
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to transform your resume into an ATS magnet
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <ClientMotion
                key={idx}
                className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </ClientMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Start free. Upgrade anytime. Cancel in 2 clicks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="text-4xl font-bold mb-6">€0<span className="text-xl text-gray-600">/month</span></div>
              <ul className="space-y-4 mb-8">
                {['1 basic analysis/month', '3 improvement suggestions', 'Community support'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                Get Started Free
              </button>
            </div>

            <div className="relative bg-gradient-to-b from-blue-600 to-purple-600 p-8 rounded-2xl text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/10 p-4 rounded-full backdrop-blur">
                <span className="text-sm font-semibold">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <div className="text-4xl font-bold mb-6">€14.99<span className="text-xl text-white/80">/month</span></div>
              <ul className="space-y-4 mb-8">
                {['Unlimited analyses', 'Priority GPT-5 processing', 'ATS score tracking', 'Cover letter generator', 'Email support'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg bg-white text-blue-600 hover:bg-gray-100 transition-colors font-semibold">
                Start 7-Day Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
