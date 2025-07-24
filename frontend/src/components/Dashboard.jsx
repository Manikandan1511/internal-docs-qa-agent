// src/components/Dashboard.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// IMPORTANT: All lucide-react icon imports are commented out to resolve "ReferenceError: [IconName] is not defined"
// If you need these icons, consider checking lucide-react documentation for your specific version
// or trying a different version of the library.
// import { BookText, Upload, MessageCircle, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome to Internal Docs Q&A Agent</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Upload File */}
        <Card className="hover:shadow-xl transition">
          <CardContent className="flex flex-col items-center p-6">
            {/* <Upload className="h-10 w-10 text-blue-600 mb-2" /> */} {/* Icon commented out */}
            <h2 className="text-xl font-semibold mb-1">Upload File</h2>
            <p className="text-sm text-gray-500 text-center">Upload documents to make them queryable</p>
            <Link to="/upload">
              <Button className="mt-4 w-full">Go</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Ask Questions */}
        <Card className="hover:shadow-xl transition">
          <CardContent className="flex flex-col items-center p-6">
            {/* <MessageCircle className="h-10 w-10 text-green-600 mb-2" /> */} {/* Icon commented out */}
            <h2 className="text-xl font-semibold mb-1">AI Q&A</h2>
            <p className="text-sm text-gray-500 text-center">Ask questions to your uploaded docs</p>
            <Link to="/chat">
              <Button className="mt-4 w-full">Chat</Button>
            </Link>
          </CardContent>
        </Card>

        {/* View Docs */}
        <Card className="hover:shadow-xl transition">
          <CardContent className="flex flex-col items-center p-6">
            {/* <BookText className="h-10 w-10 text-purple-600 mb-2" /> */} {/* Icon commented out */}
            <h2 className="text-xl font-semibold mb-1">View Docs</h2>
            <p className="text-sm text-gray-500 text-center">Browse or manage stored documents</p>
            <Link to="/docs">
              <Button className="mt-4 w-full">Open</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Profile */}
        <Card className="hover:shadow-xl transition">
          <CardContent className="flex flex-col items-center p-6">
            {/* <UserCircle className="h-10 w-10 text-pink-600 mb-2" /> */} {/* Icon commented out */}
            <h2 className="text-xl font-semibold mb-1">User Profile</h2>
            <p className="text-sm text-gray-500 text-center">View login info or manage sessions</p>
            <Link to="/profile">
              <Button className="mt-4 w-full">View</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;