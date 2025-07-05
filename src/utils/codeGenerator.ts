// This file is now deprecated as we use real AI generation
// Keeping it for fallback purposes only

interface GeneratedCode {
  html: string;
  css: string;
  js: string;
}

export function generateCode(prompt: string): GeneratedCode {
  // This is now a fallback function - the real generation happens in aiService
  return {
    html: '<div class="fallback">\n  <h1>Fallback Mode</h1>\n  <p>AI service unavailable. Please check your connection.</p>\n</div>',
    css: '.fallback {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  font-family: system-ui;\n  background: #f0f0f0;\n  color: #333;\n}',
    js: 'console.log("Fallback mode active");'
  };
}