
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { PaperAirplaneIcon, SparklesIcon, UserIcon, ArrowUturnLeftIcon } from './icons/Icons';

interface ChatInterfaceProps {
  messages: Message[];
  onQuestionSubmit: (question: string) => void;
  isLoadingAnswer: boolean;
  documentName: string | null;
  onReset: () => void;
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  return (
    <div className={`flex items-start gap-4 ${isAssistant ? '' : 'justify-end'}`}>
      {isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
          <SparklesIcon className="w-5 h-5 text-white" />
        </div>
      )}
      <div className={`max-w-xl p-4 rounded-xl ${isAssistant ? 'bg-slate-700' : 'bg-blue-600 text-white'}`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
       {!isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-slate-200" />
        </div>
      )}
    </div>
  );
};


export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onQuestionSubmit, isLoadingAnswer, documentName, onReset }) => {
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoadingAnswer) {
      onQuestionSubmit(input.trim());
      setInput('');
    }
  };

  return (
    <div className="w-full max-w-4xl h-[75vh] flex flex-col bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="flex-shrink-0 p-4 border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-200 truncate pr-4">
          Querying: <span className="text-indigo-400">{documentName || 'your document'}</span>
        </h2>
        <button onClick={onReset} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 rounded-md transition-colors text-slate-300">
           <ArrowUturnLeftIcon className="w-4 h-4" />
           New Document
        </button>
      </div>

      <div ref={chatContainerRef} className="flex-grow p-6 space-y-6 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoadingAnswer && (
           <div className="flex items-start gap-4">
             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
             </div>
             <div className="max-w-xl p-4 rounded-xl bg-slate-700">
               <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
               </div>
             </div>
           </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-700">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask a question about the document..."
            rows={1}
            className="w-full bg-slate-700 text-slate-200 placeholder-slate-400 rounded-lg py-3 pl-4 pr-12 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            disabled={isLoadingAnswer}
          />
          <button
            type="submit"
            disabled={isLoadingAnswer || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors text-slate-300 bg-slate-600 hover:bg-indigo-600 hover:text-white disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
