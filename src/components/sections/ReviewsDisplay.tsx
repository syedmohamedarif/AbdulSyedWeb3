import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Review } from '../../types';
import Container from '../ui/Container';

export default function ReviewsDisplay() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApprovedReviews();
  }, []);

  const loadApprovedReviews = async () => {
    try {
      // First try with orderBy (requires index)
      try {
        const q = query(
          collection(db, 'reviews'),
          where('approved', '==', true),
          orderBy('created_at', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const reviewsData: Review[] = [];
        querySnapshot.forEach((doc) => {
          reviewsData.push({
            id: doc.id,
            ...doc.data(),
          } as Review);
        });
        // Sort manually as fallback
        reviewsData.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
        setReviews(reviewsData);
      } catch (indexError: any) {
        // If index error, try without orderBy
        if (indexError.code === 'failed-precondition') {
          console.log('Index not found, fetching without orderBy...');
          const q = query(
            collection(db, 'reviews'),
            where('approved', '==', true)
          );
          const querySnapshot = await getDocs(q);
          const reviewsData: Review[] = [];
          querySnapshot.forEach((doc) => {
            reviewsData.push({
              id: doc.id,
              ...doc.data(),
            } as Review);
          });
          // Sort manually
          reviewsData.sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
            const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
            return dateB - dateA;
          });
          setReviews(reviewsData);
        } else {
          throw indexError;
        }
      }
    } catch (error: any) {
      console.error('Error loading reviews:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      // Set empty array on error so component doesn't show loading forever
      setReviews([]);
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
