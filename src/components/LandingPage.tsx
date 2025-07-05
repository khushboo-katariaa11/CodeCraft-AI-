import React from 'react';
import { Code, Zap, Eye, Sparkles, Brain, Rocket, Shield, Star, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        
        {/* Floating Code Elements */}
        <div className="absolute top-20 left-20 text-purple-300/30 text-6xl font-mono animate-float">{'<>'}</div>
        <div className="absolute top-40 right-32 text-pink-300/30 text-4xl font-mono animate-float-delayed">{'{}'}</div>
        <div className="absolute bottom-32 left-32 text-blue-300/30 text-5xl font-mono animate-float-slow">{'</>'}</div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">CodeCraft AI</span>
              <div className="text-xs text-purple-300 font-medium">AI Powered</div>
            </div>
          </div>
          <button
            onClick={onGetStarted}
            className="group px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 mb-8 group hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300">
            <Brain className="w-5 h-5 text-purple-300 group-hover:animate-pulse" />
            <span className="text-purple-300 font-medium">Powered by Google Gemini AI</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Build Apps with
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              Real AI Magic
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Describe your idea in plain English and watch as our advanced AI generates complete, 
            <span className="text-purple-300 font-semibold"> production-ready web applications</span> with 
            beautiful HTML, CSS, and JavaScript in real-time.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onGetStarted}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-bold text-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <Rocket className="w-6 h-6" />
                <span>Start Building with AI</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </button>
            
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span className="font-semibold">Watch Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-400">Apps Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{'< 30s'}</div>
              <div className="text-gray-400">Generation Time</div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of web development with cutting-edge artificial intelligence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real AI Generation</h3>
              <p className="text-gray-300 leading-relaxed">
                Powered by Google Gemini AI, our system generates unique, functional code based on your exact requirements. 
                No pre-built templates - every app is created fresh with advanced machine learning.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:from-blue-500/10 hover:to-cyan-500/10 hover:border-blue-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Live Preview</h3>
              <p className="text-gray-300 leading-relaxed">
                Watch your application come to life instantly with real-time preview. See HTML, CSS, and JavaScript 
                code generated and executed in real-time with immediate visual feedback.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:from-green-500/10 hover:to-emerald-500/10 hover:border-green-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/25">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Production Ready</h3>
              <p className="text-gray-300 leading-relaxed">
                Generate clean, modern, and production-ready code with responsive design, smooth animations, 
                accessibility features, and industry best practices built-in from the start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">See It In Action</h2>
            <p className="text-xl text-gray-300">From idea to reality in seconds</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">1</div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-lg mb-2">Describe Your Vision</h4>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/50">
                    <p className="text-purple-300 font-mono text-sm">
                      "Create a modern calculator with glassmorphism design, smooth animations, and dark theme"
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">2</div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-lg mb-2">AI Generates Code</h4>
                  <p className="text-gray-300">
                    Watch as our advanced AI creates beautiful HTML, CSS, and JavaScript code in real-time, 
                    tailored specifically to your requirements.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">3</div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-lg mb-2">Instant Preview & Iterate</h4>
                  <p className="text-gray-300">
                    See your fully functional app running immediately. Make changes, add features, 
                    or refine the design with simple conversational requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}