import { useState } from 'react';
import Button from '../ui/Button';
import { supabase } from '../../config/supabaseClient';

interface ReviewData {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

export default function ReviewForm() {
  const [formData, setFormData] = useState<ReviewData>({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSubmitStatus('idle');
      setErrorMessage('');

      // Save review as pending in Supabase first
      let supabaseSuccess = false;
      if (supabase) {
        try {
          const { data, error: supabaseError } = await supabase.from('reviews').insert([
            {
              name: formData.name,
              email: formData.email,
              rating: formData.rating,
              comment: formData.comment,
              approved: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]).select();

          if (supabaseError) {
            console.error('Supabase insert failed:', supabaseError);
            console.error('Error details:', {
              message: supabaseError.message,
              details: supabaseError.details,
              hint: supabaseError.hint,
              code: supabaseError.code
            });
            // Still try to send email, but log the error
          } else {
            supabaseSuccess = true;
            console.log('Review saved to Supabase:', data);
          }
        } catch (supabaseErr: any) {
          console.error('Supabase error:', supabaseErr);
          console.error('Error details:', supabaseErr.message || supabaseErr);
          // Continue anyway - email is more important
        }
      } else {
        console.warn('Supabase not configured - review will only be sent via email');
      }

      const formattedMessage = `
New Review Submission

Name: ${formData.name}
Email: ${formData.email}
Rating: ${formData.rating}/5
Comment: ${formData.comment}

Please review and approve this review in the admin panel.
      `.trim();

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '4fbe02f3-f235-4742-879f-87bf078bff86',
          subject: 'New Review Submission',
          from_name: formData.name,
          reply_to: formData.email,
          to_email: 'syedmohamedarif03@gmail.com',
          message: formattedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          rating: 5,
          comment: '',
        });
        
        // Log success status
        if (supabaseSuccess) {
          console.log('Review submitted successfully - saved to Supabase and email sent');
        } else {
          console.warn('Review submitted - email sent but NOT saved to Supabase. Check RLS policies.');
        }
      } else {
        throw new Error(result.message || 'Failed to submit review');
      }
    } catch (error: any) {
      console.error('Error submitting review:', error);
      setSubmitStatus('error');
      
      // Set user-friendly error message
      if (error.message) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          setErrorMessage('Network error. Please check your internet connection.');
        } else if (error.message.includes('HTTP error')) {
          setErrorMessage('Server error. Please try again in a moment.');
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Share Your Experience</h3>
      
      {submitStatus === 'success' && (
        <p className="mb-4 text-green-600">Thank you for your review! It will be published after approval.</p>
      )}
      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-semibold">Error submitting review</p>
          {errorMessage && (
            <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
          )}
          <p className="text-red-600 text-sm mt-1">Please check your internet connection and try again.</p>
        </div>
      )}
      
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        required
      />
      <div className="mb-3">
        <label className="block mb-2 text-gray-700">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({ ...formData, rating: star })}
              className={`text-2xl focus:outline-none ${
                star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <textarea
        placeholder="Your Review"
        value={formData.comment}
        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        rows={4}
        required
      ></textarea>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}

