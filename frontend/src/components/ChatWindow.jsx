import React, { useState } from "react";
import axios from "axios";

const ChatWindow = () => {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    setChat((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/query", {
        question,
      });

      const aiMessage = {
        sender: "ai",
        text: response.data.answer || "No answer provided.",
        sources: response.data.sources || [],
      };

      setChat((prev) => [...prev, aiMessage]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Failed to get response from AI." },
      ]);
    } finally {
      setQuestion("");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🔎 Internal Docs Q&A Agent</h1>
      <div className="bg-white rounded-xl shadow-md h-[400px] overflow-y-scroll p-4 space-y-4 border">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg ${
              msg.sender === "user" ? "bg-blue-100 text-right" : "bg-green-100 text-left"
            }`}
          >
            <p>{msg.text}</p>
            {msg.sender === "ai" && msg.sources && msg.sources.length > 0 && (
              <div className="text-sm text-gray-500 mt-2">
                <strong>Sources:</strong> {msg.sources.join(", ")}
              </div>
            )}
          </div>
        ))}
        {loading && <p className="text-center">🔄 Thinking...</p>}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-xl px-4 py-2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something about the docs..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
