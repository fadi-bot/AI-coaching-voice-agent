"use client"
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { CoachingExperts } from "../../../../services/Options";
import NextImage from "next/image";
import { createDiscussionRoom } from '../../../../lib/supabaseClient';
import { useAuth } from '../../../../app/providers';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabaseClient';

function UserInputDialog({ children, coachingOption }) {
    const [selectedExpert, setSelectedExpert] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { user, signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        console.log('Submit button clicked');
        console.log('Form values:', { inputValue, selectedExpert });
        
        if (!inputValue.trim()) {
            console.error('Input value is empty');
            alert('Please enter a message');
            return;
        }
        if (!selectedExpert) {
            console.error('No expert selected');
            alert('Please select an expert');
            return;
        }
        
        try {
            setLoading(true);
                // First check the user from AuthContext
            console.log('Current user from AuthContext:', user);
            
            // If user is not in AuthContext, try to refresh the session
            if (!user) {
                console.log('No user in AuthContext, refreshing session...');
                const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.getSession();
                
                // Check if there's an actual error or no session/user
                if (refreshError) {
                    console.error('Session refresh error:', refreshError);
                    console.log('Redirecting to login due to refresh error...');
                    window.location.href = '/app/login?redirect=' + encodeURIComponent(window.location.pathname);
                    return;
                }
                
                if (!refreshedSession || !refreshedSession.user) {
                    console.log('No active session found, redirecting to login...');
                    window.location.href = '/app/login?redirect=' + encodeURIComponent(window.location.pathname);
                    return;
                }
                
                console.log('Session refreshed successfully:', refreshedSession.user.email);
            }
            
            console.log('User is authenticated, proceeding with room creation...');
            
            const roomData = {
                status: 'active'
            };
            
            console.log('Calling createDiscussionRoom with:', JSON.stringify(roomData, null, 2));
            
            const newRoom = await createDiscussionRoom(roomData);
            console.log('New discussion room created:', newRoom);
            
            // Navigate to the chat page with the room ID and other parameters
            router.push(`/chat?roomId=${newRoom.id}&topic=${encodeURIComponent(inputValue)}&expert=${encodeURIComponent(selectedExpert.name)}`);
            
            setInputValue('');
            setSelectedExpert(null);
            setIsOpen(false);
            
        } catch (error) {
            console.error('Error in handleSubmit:', {
                name: error.name,
                message: error.message,
                code: error.code,
                stack: error.stack
            });
            
            if (error.message.includes('logged in') || error.message.includes('authentication')) {
                console.log('Authentication issue - redirecting to login');
                window.location.href = '/app/login?redirect=' + encodeURIComponent(window.location.pathname);
            } else {
                alert(error.message || 'Failed to start session. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {children}
            </div>
            
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                        className="fixed inset-0 bg-black/50" 
                        onClick={() => setIsOpen(false)}
                    ></div>
                    
                    <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-4 z-10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Mock Interview
                            </h2>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Enter a topic to master your skills in Mock Interview
                            </label>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Full Stack Frontend Developer (React)"
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select an expert
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                {CoachingExperts.map((expert, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => setSelectedExpert(expert.name)}
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex flex-col items-center ${
                                            selectedExpert === expert.name 
                                                ? 'border-blue-500 shadow-md' 
                                                : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center">
                                            <NextImage 
                                                src={expert.avatar} 
                                                alt={expert.name}
                                                height={80}
                                                width={80}
                                                className="rounded-full h-20 w-20 object-cover"
                                            />
                                            <span className="mt-2 text-sm font-medium">{expert.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!inputValue.trim() || !selectedExpert || loading}
                                className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg flex items-center justify-center ${
                                    !inputValue.trim() || !selectedExpert || loading
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </>
                                ) : (
                                    'Next'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserInputDialog;