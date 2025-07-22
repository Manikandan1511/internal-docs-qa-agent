import React from "react";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">📄 Internal Docs Q&A Agent</h1>
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
