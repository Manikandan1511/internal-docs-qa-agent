// src/components/ChatWindow.jsx

import React, { useState } from "react";
import Message from "./Message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me anything about your internal docs 📄" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  const handleSend = async () => { // Make handleSend async
    if (!input.trim() || isLoading) return; // Prevent multiple sends

    const userMessage = { role: "user", content: input };
    // Optimistically add user message
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(""); // Clear input immediately
    setIsLoading(true); // Set loading to true

    try {
      const response = await fetch("http://127.0.0.1:8000/query", { // Your backend API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage.content }), // Send question in expected format
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Add AI's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.answer } // Use data.answer
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      // Add an error message to display in the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Oops! Something went wrong. Please try again. (Check backend server)" }
      ]);
    } finally {
      setIsLoading(false); // Always set loading to false
    }
  };

  return (
    <Card className="bg-background shadow-xl rounded-2xl border">
      <CardContent className="p-4 space-y-4">
        <div className="h-[400px] overflow-y-auto pr-2 flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <Message key={idx} role={msg.role} content={msg.content} />
          ))}
          {/* Optional: Loading indicator */}
          {isLoading && (
            <Message role="assistant" content="Thinking..." />
          )}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1"
            onKeyPress={(e) => { // Allow sending with Enter key
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            disabled={isLoading} // Disable input while loading
          />
          <Button onClick={handleSend} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ChatWindow;