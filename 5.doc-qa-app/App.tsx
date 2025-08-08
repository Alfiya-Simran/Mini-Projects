
import React, { useState, useCallback } from 'react';
import { FileUploader } from './components/FileUploader';
import { ChatInterface } from './components/ChatInterface';
import { answerQuestionFromDocument } from './services/geminiService';
import { DocumentState, Message } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [docState, setDocState] = useState<DocumentState>(DocumentState.IDLE);
  const [docText, setDocText] = useState<string | null>(null);
  const [docName, setDocName] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileProcessed = useCallback((text: string, name: string) => {
    setDocText(text);
    setDocName(name);
    setDocState(DocumentState.READY);
    setError(null);
    setMessages([
      {
        role: 'assistant',
        content: `I've finished reading "${name}". What would you like to know?`
      }
    ]);
  }, []);

  const handleProcessingState = useCallback((state: DocumentState, message?: string) => {
    setDocState(state);
    if (message) {
      setError(message);
    }
  }, []);

  const handleQuestionSubmit = async (question: string) => {
    if (!docText || isLoadingAnswer) return;

    setIsLoadingAnswer(true);
    setError(null);
    const newMessages: Message[] = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);

    try {
      const answer = await answerQuestionFromDocument(docText, question);
      setMessages([...newMessages, { role: 'assistant', content: answer }]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Sorry, I ran into an issue. ${errorMessage}`);
      setMessages([...newMessages, { role: 'assistant', content: "I apologize, but I couldn't get an answer. Please try again." }]);
    } finally {
      setIsLoadingAnswer(false);
    }
  };
  
  const handleReset = () => {
    setDocState(DocumentState.IDLE);
    setDocText(null);
    setDocName(null);
    setMessages([]);
    setError(null);
    setIsLoadingAnswer(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        {docState === DocumentState.IDLE || docState === DocumentState.PROCESSING || docState === DocumentState.ERROR ? (
          <FileUploader onFileProcessed={handleFileProcessed} setProcessingState={handleProcessingState} />
        ) : (
          <ChatInterface 
            messages={messages} 
            onQuestionSubmit={handleQuestionSubmit}
            isLoadingAnswer={isLoadingAnswer}
            documentName={docName}
            onReset={handleReset}
          />
        )}
        {error && <div className="mt-4 text-red-400 bg-red-900/50 p-3 rounded-md">{error}</div>}
      </main>
      <Footer />
    </div>
  );
};

export default App;
