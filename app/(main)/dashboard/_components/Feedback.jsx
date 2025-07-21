'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { useAuth } from '../../../providers';
import { Button } from '../../../../components/ui/button';
import { Star, MessageSquare, TrendingUp } from 'lucide-react';

function Feedback() {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [newFeedback, setNewFeedback] = useState({ rating: 5, comment: '' });
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchFeedback();
        }
    }, [user]);

    const fetchFeedback = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('feedback')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error && error.code !== 'PGRST116') { // Table doesn't exist error
                throw error;
            }
            setFeedback(data || []);
        } catch (err) {
            console.error('Error fetching feedback:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const submitFeedback = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('feedback')
                .insert([
                    {
                        user_id: user.id,
                        rating: newFeedback.rating,
                        comment: newFeedback.comment,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;
            
            setNewFeedback({ rating: 5, comment: '' });
            setShowFeedbackForm(false);
            fetchFeedback();
            alert('Thank you for your feedback!');
        } catch (err) {
            console.error('Error submitting feedback:', err);
            alert('Failed to submit feedback. Please try again.');
        }
    };

    const renderStars = (rating, interactive = false, onRatingChange = null) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-5 h-5 ${
                            star <= rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                        } ${
                            interactive ? 'cursor-pointer hover:text-yellow-400' : ''
                        }`}
                        onClick={() => interactive && onRatingChange && onRatingChange(star)}
                    />
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className='font-bold text-xl mb-4'>Feedback & Reviews</h2>
                <div className="animate-pulse space-y-3">
                    {[1, 2].map(i => (
                        <div key={i} className="h-20 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className='font-bold text-xl'>Feedback & Reviews</h2>
                <Button 
                    onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                    variant="outline" 
                    size="sm"
                >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Give Feedback
                </Button>
            </div>

            {showFeedbackForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <form onSubmit={submitFeedback}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating
                            </label>
                            {renderStars(newFeedback.rating, true, (rating) => 
                                setNewFeedback({ ...newFeedback, rating })
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Comment
                            </label>
                            <textarea
                                value={newFeedback.comment}
                                onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                                className="w-full p-3 border rounded-md resize-none"
                                rows={3}
                                placeholder="Share your experience with our AI coaching platform..."
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" size="sm">
                                Submit Feedback
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => setShowFeedbackForm(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}
            
            {error ? (
                <div className="text-center py-4">
                    <p className="text-red-500 mb-2">Error loading feedback</p>
                    <Button onClick={fetchFeedback} variant="outline" size="sm">
                        Try Again
                    </Button>
                </div>
            ) : feedback.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">
                        <TrendingUp className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className='text-gray-500 font-medium'>No Feedback Yet</h3>
                    <p className='text-gray-400 text-sm mt-1'>Share your experience to help us improve</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {feedback.map((item) => (
                        <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                {renderStars(item.rating)}
                                <span className="text-sm text-gray-500">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-700">{item.comment}</p>
                        </div>
                    ))}
                </div>
            )}

            {feedback.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Average Rating:</span>
                        <div className="flex items-center gap-2">
                            {renderStars(Math.round(feedback.reduce((acc, item) => acc + item.rating, 0) / feedback.length))}
                            <span className="font-medium">
                                {(feedback.reduce((acc, item) => acc + item.rating, 0) / feedback.length).toFixed(1)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Feedback;
