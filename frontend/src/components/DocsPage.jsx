// frontend/src/components/DocsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DocsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/docs/"); // Backend endpoint for listing docs
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Failed to load documents. Please check the backend server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">Available Documents</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {isLoading ? (
            <p className="text-center text-gray-600">Loading documents...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : documents.length === 0 ? (
            <p className="text-center text-gray-600">No documents uploaded yet.</p>
          ) : (
            <ul className="space-y-3">
              {documents.map((doc, index) => (
                <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                  <span className="font-medium text-gray-700">{doc.name}</span>
                  <span className="text-sm text-gray-500">
                    {(doc.size_bytes / 1024 / 1024).toFixed(2)} MB
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/Dashboard" className="block text-center mt-6">
            <Button variant="outline" className="w-full">
              Back to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocsPage;