
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export enum DocumentState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  READY = 'READY',
  ERROR = 'ERROR'
}
