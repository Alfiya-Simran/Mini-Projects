
import React, { useState, useCallback, useRef } from 'react';
import { DocumentState } from '../types';
import { DocumentArrowUpIcon, ArrowPathIcon } from './icons/Icons';

// Declare mammoth and pdfjsLib in the window scope for TypeScript
declare global {
  interface Window {
    mammoth: any;
    pdfjsLib: any;
  }
}

interface FileUploaderProps {
  onFileProcessed: (text: string, name: string) => void;
  setProcessingState: (state: DocumentState, message?: string) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileProcessed, setProcessingState }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file) return;

    setProcessing(true);
    setProcessingState(DocumentState.PROCESSING);

    try {
      let text = '';
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (!e.target?.result) throw new Error("Failed to read PDF file.");
          const pdf = await window.pdfjsLib.getDocument({ data: e.target.result as ArrayBuffer }).promise;
          let content = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            content += textContent.items.map((s: any) => s.str).join(' ');
          }
          onFileProcessed(content, file.name);
        };
        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith('.docx')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await window.mammoth.extractRawText({ arrayBuffer: arrayBuffer });
        text = result.value;
        onFileProcessed(text, file.name);
      } else { // Assume .txt or other plain text
        text = await file.text();
        onFileProcessed(text, file.name);
      }
    } catch (err) {
      console.error("File processing error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setProcessingState(DocumentState.ERROR, `Failed to process ${file.name}. Please ensure it is a valid file. Error: ${errorMessage}`);
    } finally {
      setProcessing(false);
    }
  }, [onFileProcessed, setProcessingState]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };


  return (
    <div className="w-full max-w-2xl text-center">
      <div 
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${isDragging ? 'border-indigo-400 bg-slate-700/50 scale-105' : 'border-slate-600 hover:border-indigo-500 hover:bg-slate-800/60'}`}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.docx,.txt"
          className="hidden"
          disabled={processing}
        />
        {processing ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <ArrowPathIcon className="h-12 w-12 text-indigo-400 animate-spin"/>
            <p className="text-slate-300">Processing your document...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <DocumentArrowUpIcon className="h-12 w-12 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <p className="text-slate-300">
              <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500">PDF, DOCX, or TXT</p>
          </div>
        )}
      </div>
    </div>
  );
};
