'use client';

import { Button } from "../components/ui/button";
import { UserButton, useUser } from "@stackframe/stack";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Users, Zap, Shield, Star } from "lucide-react";

export default function Home() {
  const user = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">AI Coach</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline">Dashboard</Button>
                  </Link>
                  <UserButton />
                </>
              ) : (
                <Link href="/login">
                  <Button>Get Started</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Your Personal
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {' '}AI Coach
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your skills with personalized AI coaching. Get expert guidance on interviews, 
              presentations, language learning, and more - available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="flex items-center">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button size="lg" className="flex items-center">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Watch Demo
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AI Coach?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of personalized learning and development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600">Advanced AI technology provides personalized coaching tailored to your needs</p>
            </div>
            
            <div className="text-center p-6">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Feedback</h3>
              <p className="text-gray-600">Get immediate, actionable feedback to improve your performance</p>
            </div>
            
            <div className="text-center p-6">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Coaches</h3>
              <p className="text-gray-600">Choose from various AI coaching personalities and expertise areas</p>
            </div>
            
            <div className="text-center p-6">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Options Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Coaching Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive coaching across multiple domains
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Image src="/lecture.png" alt="Lecture" width={32} height={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lecture Coaching</h3>
              <p className="text-gray-600">Improve your presentation and public speaking skills</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Image src="/interview.png" alt="Interview" width={32} height={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mock Interviews</h3>
              <p className="text-gray-600">Practice interviews with AI feedback and tips</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Image src="/language.png" alt="Language" width={32} height={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Language Skills</h3>
              <p className="text-gray-600">Enhance your communication and language abilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Skills?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of users who have improved their skills with AI Coach
          </p>
          {!user && (
            <Link href="/login">
              <Button size="lg" variant="secondary" className="flex items-center mx-auto">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">AI Coach</span>
              </div>
              <p className="text-gray-400">
                Empowering personal and professional growth through AI-powered coaching.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Coach. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
