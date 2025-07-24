// frontend/src/components/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/profile/"); // Backend endpoint for profile
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data. Please check the backend server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {isLoading ? (
            <p className="text-center text-gray-600">Loading profile...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : profile ? (
            <div className="space-y-2">
              <p><span className="font-semibold">Username:</span> {profile.username}</p>
              <p><span className="font-semibold">Email:</span> {profile.email}</p>
              <p><span className="font-semibold">Role:</span> {profile.role}</p>
              <p><span className="font-semibold">Status:</span> {profile.status}</p>
            </div>
          ) : (
            <p className="text-center text-gray-600">No profile data available.</p>
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

export default ProfilePage;