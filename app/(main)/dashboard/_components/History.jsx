'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { useAuth } from '../../../providers';
import { Button } from '../../../../components/ui/button';
import { formatDistanceToNow } from 'date-fns';

function History() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchSessions();
        }
    }, [user]);

    const fetchSessions = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('discussion_rooms')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) throw error;
            setSessions(data || []);
        } catch (err) {
            console.error('Error fetching sessions:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteSession = async (sessionId) => {
        try {
            const { error } = await supabase
                .from('discussion_rooms')
                .delete()
                .eq('id', sessionId)
                .eq('user_id', user.id);

            if (error) throw error;
            setSessions(sessions.filter(session => session.id !== sessionId));
        } catch (err) {
            console.error('Error deleting session:', err);
            alert('Failed to delete session');
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className='font-bold text-xl mb-4'>Your Previous Sessions</h2>
                <div className="animate-pulse space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className='font-bold text-xl mb-4'>Your Previous Sessions</h2>
                <div className="text-red-500 text-center py-4">
                    <p>Error loading sessions: {error}</p>
                    <Button onClick={fetchSessions} className="mt-2">
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className='font-bold text-xl'>Your Previous Sessions</h2>
                <Button onClick={fetchSessions} variant="outline" size="sm">
                    Refresh
                </Button>
            </div>
            
            {sessions.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className='text-gray-500 font-medium'>No Previous Sessions</h3>
                    <p className='text-gray-400 text-sm mt-1'>Start your first coaching session to see it here</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {sessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        session.status === 'active' ? 'bg-green-100 text-green-800' :
                                        session.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {session.status}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Session ID: {session.id.slice(0, 8)}...
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                        // Navigate to session details or resume session
                                        console.log('View session:', session.id);
                                    }}
                                >
                                    View
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this session?')) {
                                            deleteSession(session.id);
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default History;