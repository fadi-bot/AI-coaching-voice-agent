"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../app/providers';

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const roomId = searchParams.get('roomId');
  const topic = searchParams.get('topic') || 'Topic Base Lecture';
  const expert = searchParams.get('expert') || 'Joanna';
  
  // Fetch chat history when component mounts
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!roomId) return;
      
      try {
        // TODO: Implement fetching chat history for the room
        // const { data, error } = await supabase
        //   .from('messages')
        //   .select('*')
        //   .eq('room_id', roomId)
        //   .order('created_at', { ascending: true });
        // 
        // if (error) throw error;
        // setMessages(data || []);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
    
    fetchChatHistory();
  }, [roomId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">Logoipsum</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-medium text-sm">S</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{topic}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Expert Profile Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-2xl text-gray-400">{expert.charAt(0)}</span>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{expert}</h2>
              <p className="text-sm text-gray-500 mt-1">Language Coach</p>
              
              <div className="mt-6 w-full">
                <Button 
                  className={`w-full ${isConnected ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                  onClick={async () => {
                    if (isConnected) return;
                    
                    setIsConnecting(true);
                    try {
                      // TODO: Implement connection logic with the expert
                      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate connection
                      setIsConnected(true);
                    } catch (error) {
                      console.error('Error connecting to expert:', error);
                      alert('Failed to connect. Please try again.');
                    } finally {
                      setIsConnecting(false);
                    }
                  }}
                  disabled={isConnecting || isConnected}
                >
                  {isConnecting ? (
                    'Connecting...'
                  ) : isConnected ? (
                    'Connected ✅'
                  ) : (
                    'Connect'
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">No messages yet</p>
                  {!isConnected && (
                    <p className="text-sm text-gray-400">Connect with {expert} to start chatting</p>
                  )}
                </div>
              )}
            </div>
            
            {isConnected && (
              <div className="mt-4 flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newMessage.trim()) {
                      // TODO: Implement send message
                      setMessages(prev => [...prev, { 
                        id: Date.now(), 
                        content: newMessage, 
                        sender: 'user',
                        timestamp: new Date().toISOString()
                      }]);
                      setNewMessage('');
                    }
                  }}
                />
                <Button 
                  onClick={() => {
                    if (newMessage.trim()) {
                      // TODO: Implement send message
                      setMessages(prev => [...prev, { 
                        id: Date.now(), 
                        content: newMessage, 
                        sender: 'user',
                        timestamp: new Date().toISOString()
                      }]);
                      setNewMessage('');
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Send
                </Button>
              </div>
            )}
            
            <div className="text-center text-sm text-gray-500 mt-4">
              At the end of your conversation we will automatically generate feedback/notes from your conversation.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
