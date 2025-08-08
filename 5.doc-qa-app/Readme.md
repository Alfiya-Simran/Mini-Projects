
# DocuQuery AI

An intelligent system that allows you to upload documents (PDF, DOCX, TXT) and ask questions based on their content. The application uses the Google Gemini AI to provide context-aware answers sourced exclusively from your files.


## ✨ Features

- **Multi-Format Document Upload**: Supports PDF, DOCX, and TXT files.
- **Client-Side Processing**: Files are processed directly in the browser using `pdf.js` and `mammoth.js` for enhanced privacy and speed.
- **AI-Powered Q&A**: Leverages the powerful `gemini-2.5-flash` model from the Google Gemini API for intelligent and accurate question answering.
- **Strictly Context-Aware**: The AI is instructed to answer questions *only* using the information contained within the uploaded document. If the answer isn't found, it will explicitly say so.
- **Interactive Chat Interface**: A clean, modern, and responsive chat UI to interact with your document.
- **Easy File Uploads**: Supports both click-to-select and drag-and-drop for a seamless user experience.
- **State Management**: Clear visual feedback for processing, loading, and error states.

## ⚙️ How It Works

1.  **Upload**: The user uploads a document (`.pdf`, `.docx`, or `.txt`) via the user interface.
2.  **Process**: The application uses JavaScript libraries (`pdf.js` for PDFs, `mammoth.js` for DOCX) to extract the raw text content directly in the browser. No data is stored on a server.
3.  **Query**: The user asks a question in the chat input.
4.  **Answer**: The extracted document text and the user's question are sent to the Google Gemini API. A carefully crafted system prompt instructs the model to behave as a document analysis expert, ensuring answers are grounded in the provided text.
5.  **Display**: The AI's response is streamed back and displayed in the chat window.

## 🚀 Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI Engine**: Google Gemini API (`@google/genai`)
- **Document Processing**:
  - `pdf.js` for PDF text extraction.
  - `mammoth.js` for DOCX text extraction.

## 🛠️ Setup and Running Locally

To run this project locally, you'll need to have Node.js and a package manager like `npm` or `yarn` installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Alfiya-Simran/5.doc-qa-app.git
    cd 5.doc-qa-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    This project requires a Google Gemini API key.
    -   Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   The application is coded to read the API key from `process.env.API_KEY`. You will need to ensure your development environment (e.g., using Vite or a similar tool) is configured to expose environment variables to your client-side code. For example, in a Vite project, you would create a `.env.local` file in the project root:
    
    ```
    VITE_API_KEY=YOUR_GOOGLE_AI_API_KEY
    ```
    
    And then reference it in the code as `import.meta.env.VITE_API_KEY`.
    
    **Note**: The current code uses `process.env.API_KEY`, which is standard for a Node.js backend. For a client-side only React app (as this is), you would need a build step (like Vite or Create React App) to handle environment variables correctly and securely. **Never expose your API key directly in client-side code in a public repository.**

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    Open your browser and navigate to the local URL provided (usually `http://localhost:5173`).

## 📁 Project Structure
```
/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── icons/        # SVG Icons
│   │   ├── ChatInterface.tsx
│   │   ├── FileUploader.tsx
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── services/         # API service for Gemini (geminiService.ts)
│   ├── App.tsx           # Main application component
│   ├── index.tsx         # React entry point
│   └── types.ts          # TypeScript type definitions
├── index.html            # Main HTML file with CDN links
├── metadata.json         # Application metadata
├── package.json
└── README.md
```

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
