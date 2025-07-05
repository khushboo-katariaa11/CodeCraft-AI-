import { GoogleGenerativeAI } from '@google/generative-ai';

interface GeneratedCode {
  html: string;
  css: string;
  js: string;
}

interface ConversationMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private conversationHistory: ConversationMessage[] = [];
  private currentCode: GeneratedCode | null = null;

  constructor() {
    // Get API key from environment variables
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('VITE_GEMINI_API_KEY environment variable is not set. Please add your Google Generative AI API key to the .env file.');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Initialize conversation with enhanced system instructions
    this.initializeConversation();
  }

  private initializeConversation() {
    const systemMessage: ConversationMessage = {
      role: 'user',
      parts: [{
        text: `You are an ELITE frontend web developer AI assistant with expertise in creating stunning, production-ready web applications. Your mission is to generate exceptional, visually striking, and fully functional web applications that rival the best designs on the internet.

🎨 DESIGN EXCELLENCE REQUIREMENTS:
1. **Visual Impact**: Create designs that are immediately impressive and memorable
2. **Modern Aesthetics**: Use contemporary design trends, gradients, glassmorphism, neumorphism
3. **Color Mastery**: Implement sophisticated color schemes with proper contrast and harmony
4. **Typography**: Use beautiful font combinations with proper hierarchy and spacing
5. **Spacing & Layout**: Perfect use of whitespace, grid systems, and visual balance
6. **Interactive Elements**: Smooth animations, hover effects, and micro-interactions
7. **Responsive Design**: Flawless adaptation across all device sizes

🚀 TECHNICAL EXCELLENCE:
1. **Clean Code**: Well-structured, semantic HTML with proper accessibility
2. **Advanced CSS**: Flexbox, Grid, custom properties, animations, transforms
3. **Modern JavaScript**: ES6+, event handling, DOM manipulation, local storage
4. **Performance**: Optimized code with smooth animations and fast loading
5. **Cross-browser**: Compatible with all modern browsers

📋 CODE FORMAT REQUIREMENTS:
Generate THREE separate code blocks with these exact markers:

HTML Block:
<!-- HTML_START -->
[Your HTML code here]
<!-- HTML_END -->

CSS Block:
/* CSS_START */
[Your CSS code here]
/* CSS_END */

JavaScript Block:
// JS_START
[Your JavaScript code here]
// JS_END

🎯 STYLING GUIDELINES:
1. **Color Schemes**: Use sophisticated palettes (gradients, complementary colors)
2. **Shadows**: Implement beautiful box-shadows and drop-shadows
3. **Borders**: Rounded corners, subtle borders, or creative border effects
4. **Backgrounds**: Gradients, patterns, or textured backgrounds
5. **Animations**: Smooth transitions, hover effects, loading animations
6. **Icons**: Use CSS icons or Unicode symbols for visual elements
7. **Layout**: Modern layouts with cards, sections, and proper spacing
8. **Interactive States**: Hover, focus, active states for all interactive elements

🔄 CONVERSATION CONTEXT:
- **New Request**: Create a completely new application from scratch
- **Modification Request**: Enhance/modify the existing code while maintaining functionality
- **Always provide COMPLETE code blocks**, never partial snippets
- **Explain changes** when modifying existing applications
- **Maintain design consistency** throughout iterations

💡 INSPIRATION SOURCES:
Draw inspiration from:
- Apple's design language (clean, minimal, elegant)
- Google Material Design (purposeful, beautiful)
- Modern SaaS applications (Stripe, Linear, Notion)
- Award-winning portfolio websites
- Contemporary UI/UX trends

🎨 EXAMPLE DESIGN ELEMENTS TO INCLUDE:
- Glassmorphism effects with backdrop-filter
- Smooth gradient backgrounds
- Elegant card designs with subtle shadows
- Beautiful typography with proper line-height
- Interactive buttons with hover animations
- Loading states and micro-interactions
- Responsive grid layouts
- Modern color schemes (dark mode friendly)
- Professional spacing and alignment

Remember: Every application you create should be portfolio-worthy and production-ready. Aim for designs that users would be proud to showcase and use in real projects.

You are now ready to create exceptional web applications!`
      }]
    };

    this.conversationHistory.push(systemMessage);
  }

  async generateCode(prompt: string): Promise<GeneratedCode> {
    try {
      // Build enhanced prompt with context
      const enhancedPrompt = this.buildEnhancedPrompt(prompt);
      
      // Add user message to history
      const userMessage: ConversationMessage = {
        role: 'user',
        parts: [{ text: enhancedPrompt }]
      };
      
      this.conversationHistory.push(userMessage);

      // Generate response using conversation history
      const chat = this.model.startChat({
        history: this.conversationHistory.slice(0, -1)
      });

      const result = await chat.sendMessage(enhancedPrompt);
      const response = await result.response;
      const text = response.text();

      // Add AI response to history
      const aiMessage: ConversationMessage = {
        role: 'model',
        parts: [{ text }]
      };
      
      this.conversationHistory.push(aiMessage);

      // Parse and store the generated code
      const generatedCode = this.parseGeneratedCode(text);
      this.currentCode = generatedCode;

      return generatedCode;
    } catch (error) {
      console.error('Error generating code:', error);
      throw new Error('Failed to generate code. Please check your API key and try again.');
    }
  }

  private buildEnhancedPrompt(prompt: string): string {
    const isFirstRequest = !this.currentCode;
    
    if (isFirstRequest) {
      return `🚀 NEW APPLICATION REQUEST:
${prompt}

Please create a stunning, production-ready web application with:
- Beautiful, modern design that stands out
- Sophisticated color scheme and typography
- Smooth animations and hover effects
- Responsive layout that works on all devices
- Clean, semantic code structure
- Interactive elements with proper feedback
- Professional styling worthy of a portfolio

Make this application visually impressive and fully functional!`;
    } else {
      return `🔄 MODIFICATION REQUEST:
Current Application Context:

HTML:
${this.currentCode.html}

CSS:
${this.currentCode.css}

JavaScript:
${this.currentCode.js}

USER REQUEST: ${prompt}

Please enhance the existing application based on the user's request while:
- Maintaining the current functionality
- Improving the visual design and user experience
- Adding requested features or modifications
- Ensuring the design remains cohesive and professional
- Providing smooth transitions for any changes

Deliver the complete updated code blocks with all improvements!`;
    }
  }

  private parseGeneratedCode(text: string): GeneratedCode {
    // Extract HTML with improved regex
    const htmlMatch = text.match(/<!-- HTML_START -->([\s\S]*?)<!-- HTML_END -->/);
    const html = htmlMatch ? htmlMatch[1].trim() : this.getEnhancedDefaultHTML();

    // Extract CSS with improved regex
    const cssMatch = text.match(/\/\* CSS_START \*\/([\s\S]*?)\/\* CSS_END \*\//);
    const css = cssMatch ? cssMatch[1].trim() : this.getEnhancedDefaultCSS();

    // Extract JavaScript with improved regex
    const jsMatch = text.match(/\/\/ JS_START([\s\S]*?)\/\/ JS_END/);
    const js = jsMatch ? jsMatch[1].trim() : this.getEnhancedDefaultJS();

    return { html, css, js };
  }

  private getEnhancedDefaultHTML(): string {
    return `<div class="app-container">
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
</div>`;
  }

  private getEnhancedDefaultCSS(): string {
    return `* {
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

/* Loading animation for better UX */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s ease-in-out infinite;
}`;
  }

  private getEnhancedDefaultJS(): string {
    return `// Enhanced JavaScript with smooth interactions and animations
console.log('🚀 AI-Powered Web Application Loaded Successfully!');

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Enhanced button interactions
function startBuilding() {
  const btn = event.target.closest('.primary-btn');
  
  // Add loading state
  btn.classList.add('loading');
  btn.innerHTML = '<span>Initializing...</span>';
  
  // Simulate loading
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.innerHTML = \`
      <span>Ready to Build!</span>
      <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    \`;
    
    // Add success feedback
    showNotification('🎉 Ready to start building amazing applications!');
  }, 2000);
}

function learnMore() {
  showNotification('📚 Explore our comprehensive documentation and tutorials!');
}

// Notification system
function showNotification(message) {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Style notification
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
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Enhanced mouse interactions
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

// Intersection Observer for animations
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

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.hero-content, .floating-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Trigger animations after a short delay
  setTimeout(() => {
    animatedElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 300);
});

// Performance optimization
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

// Optimized resize handler
window.addEventListener('resize', debounce(() => {
  console.log('🔄 Window resized - optimizing layout...');
}, 250));

console.log('✨ Enhanced interactions and animations ready!');`;
  }

  // Method to reset conversation (start fresh)
  resetConversation() {
    this.conversationHistory = [];
    this.currentCode = null;
    this.initializeConversation();
  }

  // Method to get conversation history (for debugging or display)
  getConversationHistory() {
    return this.conversationHistory;
  }

  // Method to get current code
  getCurrentCode() {
    return this.currentCode;
  }
}

export const aiService = new AIService();