import React, { useState } from 'react';
import { ArrowLeft, Loader2, RotateCcw, MessageSquare, Sparkles, Zap } from 'lucide-react';
import CodeEditor from './CodeEditor';
import PreviewPane from './PreviewPane';
import PromptInput from './PromptInput';
import ConversationHistory from './ConversationHistory';
import { aiService } from '../services/aiService';

interface EditorInterfaceProps {
  onBack: () => void;
}

export default function EditorInterface({ onBack }: EditorInterfaceProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [conversationCount, setConversationCount] = useState(0);
  const [code, setCode] = useState({
    html: `<div class="app-container">
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="gradient-text">AI-Powered</span>
        <br>Web Applications
      </h1>
      <p class="hero-description">
        Experience the future of web development with our intelligent code generation platform.
      </p>
      <div class="hero-actions">
        <button class="primary-btn" onclick="startBuilding()">
          <span>Start Building</span>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        <button class="secondary-btn" onclick="learnMore()">
          Learn More
        </button>
      </div>
    </div>
    <div class="hero-visual">
      <div class="floating-card card-1">
        <div class="card-header"></div>
        <div class="card-content"></div>
      </div>
      <div class="floating-card card-2">
        <div class="card-header"></div>
        <div class="card-content"></div>
      </div>
      <div class="floating-card card-3">
        <div class="card-header"></div>
        <div class="card-content"></div>
      </div>
    </div>
  </div>
</div>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  overflow-x: hidden;
}

.app-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  align-items: center;
}

.hero-content {
  color: white;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.gradient-text {
  background: linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcf7f, #4d9de0);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-btn, .secondary-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.primary-btn {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.primary-btn:hover .btn-icon {
  transform: translateX(4px);
}

.hero-visual {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  width: 200px;
  height: 120px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  width: 180px;
  height: 140px;
  top: 50%;
  right: 20%;
  animation-delay: 2s;
}

.card-3 {
  width: 160px;
  height: 100px;
  bottom: 20%;
  left: 30%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(1deg); }
  66% { transform: translateY(10px) rotate(-1deg); }
}

.card-header {
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
  border-radius: 8px;
  margin-bottom: 1rem;
}

.card-content {
  width: 80%;
  height: 40px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
  border-radius: 6px;
}

@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-visual {
    height: 300px;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s ease-in-out infinite;
}`,
    js: `console.log('🚀 AI-Powered Web Application Loaded Successfully!');

document.documentElement.style.scrollBehavior = 'smooth';

function startBuilding() {
  const btn = event.target.closest('.primary-btn');
  
  btn.classList.add('loading');
  btn.innerHTML = '<span>Initializing...</span>';
  
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.innerHTML = \`
      <span>Ready to Build!</span>
      <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    \`;
    
    showNotification('🎉 Ready to start building amazing applications!');
  }, 2000);
}

function learnMore() {
  showNotification('📚 Explore our comprehensive documentation and tutorials!');
}

function showNotification(message) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  Object.assign(notification.style, {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#333',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    zIndex: '1000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: '500'
  });
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.floating-card');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  cards.forEach((card, index) => {
    const speed = (index + 1) * 0.5;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;
    
    card.style.transform = \`translate(\${x}px, \${y}px) rotateX(\${y * 2}deg) rotateY(\${x * 2}deg)\`;
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.hero-content, .floating-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  setTimeout(() => {
    animatedElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 300);
});

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

window.addEventListener('resize', debounce(() => {
  console.log('🔄 Window resized - optimizing layout...');
}, 250));

console.log('✨ Enhanced interactions and animations ready!');`
  });

  const handlePromptSubmit = async (prompt: string) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const generatedCode = await aiService.generateCode(prompt);
      setCode(generatedCode);
      setActiveTab('html');
      setConversationCount(prev => prev + 1);
    } catch (error) {
      console.error('Error generating code:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate code. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResetConversation = () => {
    aiService.resetConversation();
    setConversationCount(0);
    setCode({
      html: `<div class="app-container">
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="gradient-text">AI-Powered</span>
        <br>Web Applications
      </h1>
      <p class="hero-description">
        Experience the future of web development with our intelligent code generation platform.
      </p>
      <div class="hero-actions">
        <button class="primary-btn" onclick="startBuilding()">
          <span>Start Building</span>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        <button class="secondary-btn" onclick="learnMore()">
          Learn More
        </button>
      </div>
    </div>
    <div class="hero-visual">
      <div class="floating-card card-1">
        <div class="card-header"></div>
        <div class="card-content"></div>
      </div>
      <div class="floating-card card-2">
        <div class="card-header"></div>
        <div class="card-content"></div>
      </div>
      <div class="floating-card card-3">
        <div class="card-header"></div>
        <div class="card-content"></div>
      </div>
    </div>
  </div>
</div>`,
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  overflow-x: hidden;
}

.app-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  align-items: center;
}

.hero-content {
  color: white;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.gradient-text {
  background: linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcf7f, #4d9de0);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-btn, .secondary-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.primary-btn {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.primary-btn:hover .btn-icon {
  transform: translateX(4px);
}

.hero-visual {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  width: 200px;
  height: 120px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  width: 180px;
  height: 140px;
  top: 50%;
  right: 20%;
  animation-delay: 2s;
}

.card-3 {
  width: 160px;
  height: 100px;
  bottom: 20%;
  left: 30%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(1deg); }
  66% { transform: translateY(10px) rotate(-1deg); }
}

.card-header {
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
  border-radius: 8px;
  margin-bottom: 1rem;
}

.card-content {
  width: 80%;
  height: 40px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
  border-radius: 6px;
}

@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-visual {
    height: 300px;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s ease-in-out infinite;
}`,
      js: `console.log('🚀 AI-Powered Web Application Loaded Successfully!');

document.documentElement.style.scrollBehavior = 'smooth';

function startBuilding() {
  const btn = event.target.closest('.primary-btn');
  
  btn.classList.add('loading');
  btn.innerHTML = '<span>Initializing...</span>';
  
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.innerHTML = \`
      <span>Ready to Build!</span>
      <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    \`;
    
    showNotification('🎉 Ready to start building amazing applications!');
  }, 2000);
}

function learnMore() {
  showNotification('📚 Explore our comprehensive documentation and tutorials!');
}

function showNotification(message) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  Object.assign(notification.style, {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#333',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    zIndex: '1000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: '500'
  });
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.floating-card');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  cards.forEach((card, index) => {
    const speed = (index + 1) * 0.5;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;
    
    card.style.transform = \`translate(\${x}px, \${y}px) rotateX(\${y * 2}deg) rotateY(\${x * 2}deg)\`;
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.hero-content, .floating-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  setTimeout(() => {
    animatedElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 300);
});

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

window.addEventListener('resize', debounce(() => {
  console.log('🔄 Window resized - optimizing layout...');
}, 250));

console.log('✨ Enhanced interactions and animations ready!');`
    });
    setError(null);
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col">
      {/* Enhanced Header */}
      <header className="flex items-center justify-between p-4 border-b border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">CodeCraft AI</span>
            <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">AI Powered</span>
          </div>
          {conversationCount > 0 && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">{conversationCount} interactions</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {isGenerating && (
            <div className="flex items-center space-x-3 text-purple-400 bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/20">
              <div className="relative">
                <Sparkles className="w-5 h-5 animate-spin" />
                <div className="absolute inset-0 w-5 h-5 animate-ping opacity-75">
                  <Zap className="w-5 h-5 text-purple-300" />
                </div>
              </div>
              <div className="text-sm">
                <div className="font-medium">AI Generating...</div>
                <div className="text-xs text-purple-300">Creating beautiful code</div>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              showHistory 
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
                : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
            }`}
            title="Toggle conversation history"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">History</span>
          </button>
          
          <button
            onClick={handleResetConversation}
            className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200 group"
            title="Start fresh conversation"
          >
            <RotateCcw className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-sm text-gray-300 group-hover:text-white">Reset</span>
          </button>
          
          <div className="text-sm text-gray-400 bg-slate-800 px-3 py-2 rounded-lg border border-slate-600">
            Elite AI Generator
          </div>
        </div>
      </header>

      {/* Enhanced Error Display */}
      {error && (
        <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 text-red-300 px-4 py-3 mx-4 mt-2 rounded-lg backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Conversation History */}
      {showHistory && (
        <ConversationHistory 
          history={aiService.getConversationHistory()} 
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Enhanced Prompt Input */}
      <PromptInput onSubmit={handlePromptSubmit} isGenerating={isGenerating} />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="w-1/2">
          <CodeEditor
            html={code.html}
            css={code.css}
            js={code.js}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Preview Pane */}
        <div className="w-1/2">
          <PreviewPane
            html={code.html}
            css={code.css}
            js={code.js}
          />
        </div>
      </div>
    </div>
  );
}