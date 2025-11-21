import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { Review } from '../../types';
import Container from '../ui/Container';

export default function ReviewsDisplay() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApprovedReviews();
  }, []);

  const loadApprovedReviews = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="py-12 text-center">
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </Container>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="py-12 md:py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Patient Reviews
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read what our patients have to say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="text-yellow-400 text-xl">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <span className="text-sm text-gray-600">({review.rating}/5)</span>
              </div>
              <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

