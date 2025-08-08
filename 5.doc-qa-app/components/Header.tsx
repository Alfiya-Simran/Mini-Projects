
import React from 'react';
import { ChatBubbleLeftRightIcon } from './icons/Icons';

export const Header: React.FC = () => {
  return (
    <header className="w-full p-4 flex justify-center items-center border-b border-slate-700/50">
       <div className="flex items-center gap-3">
        <ChatBubbleLeftRightIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-2xl font-bold text-slate-200 tracking-tight">DocuQuery AI</h1>
      </div>
    </header>
  );
};
