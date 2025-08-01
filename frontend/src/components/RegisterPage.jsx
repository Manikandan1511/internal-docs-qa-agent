"use client"

import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react";

export default function Component() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");



  const handleContinue = (e) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem("registerEmail", email);
    localStorage.setItem("registerFirstName", firstName);
    localStorage.setItem("registerLastName", lastName);
    localStorage.setItem("registerPhone", phone);

    // Navigate to next step
    navigate("/account-setup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Back Link - Outside the card */}
        <Link
          href="#"
          className="flex gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors mb-6 items-stretch mr-7 ml-[-430px]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to PolicyBot
        </Link>

        <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-6 pb-8 pt-8">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-purple-600">PolicyBot</h1>
            </div>

            {/* Heading and Subtext */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
              <p className="text-gray-600">Join thousands who've simplified their insurance</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold shadow-lg">
                  1
                </div>
                <span className="text-sm font-medium text-purple-600">Personal Info</span>
              </div>
              <div className="w-16 h-px bg-gray-300"></div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="text-sm text-gray-500">Account Setup</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pb-8">
            {/* Form Fields */}
            <form onSubmit={handleContinue}>
              <div className="space-y-5">
                {/* First and Last Name Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>
              {/* CTA Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? "Registering..." : "Continue to Account Setup"}
              </Button>
            </form>


            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or sign up with</span>
              </div>
            </div>

            {/* Social Signup */}
            <Button
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 rounded-lg font-medium bg-transparent"
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/")}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Badges - Outside the card */}
        <div className="flex justify-center gap-4 mt-6">
          <div className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-full text-xs font-medium shadow-sm">
            <span>✅</span>
            Secure Signup
          </div>
          <div className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-medium shadow-sm">
            <span>⚡</span>
            Quick Setup
          </div>
          <div className="flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-full text-xs font-medium shadow-sm">
            <span>🔒</span>
            HIPAA Safe
          </div>
        </div>
      </div>
    </div>
  )
}
