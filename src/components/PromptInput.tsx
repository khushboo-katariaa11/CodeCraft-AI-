import React, { useState } from 'react';
import { Send, Sparkles, Zap, MessageCircle, Palette, Code, Smartphone, Globe } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isGenerating: boolean;
}

export default function PromptInput({ onSubmit, isGenerating }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const examplePrompts = [
    {
      icon: <Globe className="w-3 h-3" />,
      text: "Create a stunning landing page for a tech startup with hero section, features, and testimonials",
      category: "Landing Page"
    },
    {
      icon: <Code className="w-3 h-3" />,
      text: "Build a fully functional calculator with modern glassmorphism design and smooth animations",
      category: "App"
    }
  ];

  const iterativePrompts = [
    {
      icon: <Palette className="w-3 h-3" />,
      text: "Make the colors more vibrant and add beautiful gradient backgrounds",
      category: "Styling"
    },
    {
      icon: <Zap className="w-3 h-3" />,
      text: "Add smooth animations, hover effects, and micro-interactions throughout",
      category: "Animation"
    }
  ];

  const handleExampleClick = (example: string) => {
    if (!isGenerating) {
      setPrompt(example);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your dream application or request modifications... (e.g., 'Create a modern e-commerce landing page with animations' or 'Make the design more colorful and add hover effects')"
            className="w-full h-32 p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 shadow-lg"
            disabled={isGenerating}
          />
          
          {isGenerating && (
            <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <div className="flex items-center space-x-4 text-purple-400">
                <div className="relative">
                  <Sparkles className="w-8 h-8 animate-spin" />
                  <div className="absolute inset-0 w-8 h-8 animate-ping opacity-75">
                    <Zap className="w-8 h-8 text-purple-300" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI Creating Magic...
                  </div>
                  <div className="text-sm text-purple-300 animate-pulse">
                    Crafting beautiful, production-ready code
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-4 max-w-5xl">
            {/* New App Ideas */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-purple-300 font-semibold">✨ Create New Applications:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleExampleClick(example.text)}
                    className="group p-3 text-left bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-sm border border-slate-600/30 rounded-lg hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10"
                    disabled={isGenerating}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded flex items-center justify-center text-white">
                        {example.icon}
                      </div>
                      <span className="text-xs text-purple-300 font-medium bg-purple-500/20 px-2 py-1 rounded-full">
                        {example.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                      {example.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Modification Ideas */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-blue-300 font-semibold">🎨 Enhance Current Design:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {iterativePrompts.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleExampleClick(example.text)}
                    className="group p-3 text-left bg-gradient-to-r from-blue-700/30 to-cyan-700/30 backdrop-blur-sm border border-blue-600/30 rounded-lg hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
                    disabled={isGenerating}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded flex items-center justify-center text-white">
                        {example.icon}
                      </div>
                      <span className="text-xs text-blue-300 font-medium bg-blue-500/20 px-2 py-1 rounded-full">
                        {example.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                      {example.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 group ml-6"
          >
            {isGenerating ? (
              <>
                <div className="relative">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <div className="absolute inset-0 w-5 h-5 animate-ping opacity-75">
                    <Zap className="w-5 h-5 text-purple-200" />
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Generating...</div>
                  <div className="text-xs text-purple-200">Creating magic</div>
                </div>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                <div className="text-left">
                  <div className="font-semibold">Generate</div>
                  <div className="text-xs text-purple-200">AI Powered</div>
                </div>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}