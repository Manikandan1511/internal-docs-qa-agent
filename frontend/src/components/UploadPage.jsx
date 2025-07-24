// frontend/src/components/UploadPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setMessage("");
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/uploadfile/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(`File uploaded successfully: ${data.filename}`);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage(`Upload failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Upload Documents</h1>
          <p className="text-gray-600">Select a file to upload and make it queryable by the AI.</p>

          <div className="flex flex-col items-center space-y-4">
            <Input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100 cursor-pointer"
              disabled={isLoading}
            />
            {selectedFile && (
              <p className="text-sm text-gray-700">Selected file: <span className="font-semibold">{selectedFile.name}</span></p>
            )}
            {message && (
              <p className={`text-sm ${message.includes("failed") ? "text-red-600" : "text-green-600"}`}>
                {message}
              </p>
            )}
            <Button onClick={handleUpload} disabled={isLoading || !selectedFile} className="w-full">
              {isLoading ? "Uploading..." : "Upload File"}
            </Button>
          </div>

          <Link to="/Dashboard">
            <Button variant="outline" className="mt-4 w-full">
              Back to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadPage;