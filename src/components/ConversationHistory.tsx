import React from 'react';
import { X, User, Bot, Code } from 'lucide-react';

interface ConversationMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface ConversationHistoryProps {
  history: ConversationMessage[];
  onClose: () => void;
}

export default function ConversationHistory({ history, onClose }: ConversationHistoryProps) {
  // Filter out system messages and only show user/AI interactions
  const userInteractions = history.filter((message, index) => {
    // Skip the first system message
    if (index === 0) return false;
    
    // Only show messages that contain actual user requests or AI responses
    const text = message.parts[0]?.text || '';
    return !text.includes('CURRENT CODE CONTEXT') && !text.includes('You are an expert frontend');
  });

  const formatMessage = (text: string) => {
    // Remove code markers for display
    return text
      .replace(/<!-- HTML_START -->[\s\S]*?<!-- HTML_END -->/g, '[HTML Code Generated]')
      .replace(/\/\* CSS_START \*\/[\s\S]*?\/\* CSS_END \*\//g, '[CSS Code Generated]')
      .replace(/\/\/ JS_START[\s\S]*?\/\/ JS_END/g, '[JavaScript Code Generated]')
      .replace(/NEW APPLICATION REQUEST: /g, '')
      .replace(/USER REQUEST: /g, '')
      .trim();
  };

  return (
    <div className="bg-slate-800 border-b border-slate-700 max-h-64 overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5 text-purple-400" />
          <h3 className="text-white font-medium">Conversation History</h3>
          <span className="text-sm text-gray-400">({userInteractions.length} interactions)</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        {userInteractions.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">
            No conversation history yet. Start by describing an app you'd like to build!
          </p>
        ) : (
          userInteractions.map((message, index) => (
            <div key={index} className="flex space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-blue-500' 
                  : 'bg-purple-500'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-3 h-3 text-white" />
                ) : (
                  <Bot className="w-3 h-3 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className={`text-xs font-medium mb-1 ${
                  message.role === 'user' ? 'text-blue-300' : 'text-purple-300'
                }`}>
                  {message.role === 'user' ? 'You' : 'AI Assistant'}
                </div>
                <div className="text-sm text-gray-300 bg-slate-700/50 rounded-lg p-3">
                  {formatMessage(message.parts[0]?.text || '')}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}