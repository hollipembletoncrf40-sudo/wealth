import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icon';
import { generateBusinessCoachResponse } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AICoachProps {
    lang: Language;
}

const AICoachView: React.FC<AICoachProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: t.coachIntro
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset welcome message when language changes if only 1 message exists
  useEffect(() => {
      if (messages.length === 1) {
          setMessages([{
            id: 'welcome',
            role: 'assistant',
            content: t.coachIntro
          }]);
      }
  }, [lang, t.coachIntro]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Build simple context from last few messages
    const context = messages.slice(-4).map(m => `${m.role}: ${m.content}`).join('\n');
    
    // Add language instruction
    const langInstruction = lang === 'zh' ? "Please respond in Chinese." : "Please respond in English.";
    
    const response = await generateBusinessCoachResponse(input, context + "\n" + langInstruction);
    
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-colors">
      {/* Chat Header */}
      <div className="bg-indigo-700 p-4 flex items-center space-x-3 text-white">
        <div className="bg-white/20 p-2 rounded-lg">
          <Icons.AI className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg">{t.aiCoach}</h2>
          <p className="text-indigo-200 text-xs">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900 transition-colors">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-none'}
              `}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm prose-indigo dark:prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-slate-200 dark:border-slate-700 flex space-x-2 items-center">
               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 transition-colors">
        <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.askCoach}
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white placeholder-slate-400 h-10"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icons.ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICoachView;