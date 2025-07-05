import React from 'react';
import { FileCode, Palette, Zap, Copy, Download } from 'lucide-react';

interface CodeEditorProps {
  html: string;
  css: string;
  js: string;
  activeTab: 'html' | 'css' | 'js';
  onTabChange: (tab: 'html' | 'css' | 'js') => void;
}

export default function CodeEditor({ html, css, js, activeTab, onTabChange }: CodeEditorProps) {
  const getCode = () => {
    switch (activeTab) {
      case 'html': return html;
      case 'css': return css;
      case 'js': return js;
      default: return '';
    }
  };

  const getIcon = (tab: 'html' | 'css' | 'js') => {
    switch (tab) {
      case 'html': return <FileCode className="w-4 h-4" />;
      case 'css': return <Palette className="w-4 h-4" />;
      case 'js': return <Zap className="w-4 h-4" />;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCode());
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const downloadCode = () => {
    const code = getCode();
    const extension = activeTab === 'html' ? 'html' : activeTab === 'css' ? 'css' : 'js';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-slate-900 border-r border-slate-700 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        {(['html', 'css', 'js'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-white bg-slate-800 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {getIcon(tab)}
            <span>{tab.toUpperCase()}</span>
          </button>
        ))}
        
        {/* Action buttons */}
        <div className="ml-auto flex items-center space-x-2 px-4">
          <button
            onClick={copyToClipboard}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
            title="Copy code"
          >
            <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
          <button
            onClick={downloadCode}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
            title="Download code"
          >
            <Download className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto">
        <pre className="p-4 text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
          <code className={`language-${activeTab}`}>{getCode()}</code>
        </pre>
      </div>
    </div>
  );
}