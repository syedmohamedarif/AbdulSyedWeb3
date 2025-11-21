import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { Review } from '../types';
import Button from '../components/ui/Button';
import { auth, db } from '../config/firebase';

export default function AdminPanel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState<Omit<Review, 'id'>>({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    approved: false,
  });
  const navigate = useNavigate();

  // Define loadReviews function
  const loadReviews = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading reviews from Firebase...');
      const q = query(collection(db, 'reviews'), orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      const reviewsData: Review[] = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push({
          id: doc.id,
          ...doc.data(),
        } as Review);
      });
      console.log(`✅ Loaded ${reviewsData.length} reviews`);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
      alert('Error loading reviews. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  // Authentication and initial load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        loadReviews();
      } else {
        setAuthenticated(false);
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Set up real-time listener for reviews
  useEffect(() => {
    if (!authenticated) return;

    console.log('🔔 Setting up real-time listener for reviews...');
    const q = query(collection(db, 'reviews'), orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData: Review[] = [];
      snapshot.forEach((doc) => {
        reviewsData.push({
          id: doc.id,
          ...doc.data(),
        } as Review);
      });
      console.log(`📢 Reviews updated: ${reviewsData.length} reviews`);
      setReviews(reviewsData);
      setLoading(false);
    }, (error) => {
      console.error('Error in real-time listener:', error);
      // Fallback to manual load
      loadReviews();
    });

    return () => {
      console.log('🔕 Unsubscribing from reviews listener...');
      unsubscribe();
    };
  }, [authenticated]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingReview?.id) {
        const reviewRef = doc(db, 'reviews', editingReview.id);
        await updateDoc(reviewRef, {
          ...formData,
          updated_at: new Date().toISOString(),
        });
      } else {
        await addDoc(collection(db, 'reviews'), {
          ...formData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
      setFormData({
        name: '',
        email: '',
        rating: 5,
        comment: '',
        approved: false,
      });
      setEditingReview(null);
      // Real-time listener will update automatically
    } catch (error) {
      console.error('Error saving review:', error);
      alert('Error saving review. Please try again.');
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      email: review.email,
      rating: review.rating,
      comment: review.comment,
      approved: review.approved,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteDoc(doc(db, 'reviews', id));
      // Real-time listener will update automatically
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review. Please try again.');
    }
  };

  const toggleApproval = async (review: Review) => {
    try {
      const reviewRef = doc(db, 'reviews', review.id!);
      await updateDoc(reviewRef, {
        approved: !review.approved,
        updated_at: new Date().toISOString(),
      });
      // Real-time listener will update automatically
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  if (!authenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel - Reviews Management</h1>
          <div className="flex gap-4">
            <Button onClick={loadReviews} variant="secondary">
              Refresh
            </Button>
            <Button onClick={() => navigate('/admin/blog')} variant="secondary">
              Blog Management
            </Button>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {editingReview ? 'Edit Review' : 'Add New Review'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Rating</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              rows={4}
              required
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.approved}
                  onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Approved (visible on website)</span>
              </label>
            </div>
            <div className="flex gap-4">
              <Button type="submit">
                {editingReview ? 'Update Review' : 'Add Review'}
              </Button>
              {editingReview && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditingReview(null);
                    setFormData({
                      name: '',
                      email: '',
                      rating: 5,
                      comment: '',
                      approved: false,
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">All Reviews ({reviews.length})</h2>
          {loading ? (
            <p className="text-gray-600">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`border rounded-lg p-4 ${
                    review.approved ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{review.name}</h3>
                      <p className="text-sm text-gray-600">{review.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-400">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
                        </span>
                        <span className="text-sm text-gray-600">({review.rating}/5)</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          review.approved
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {review.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => toggleApproval(review)}
                      className="text-sm"
                    >
                      {review.approved ? 'Unapprove' : 'Approve'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(review)}
                      className="text-sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleDelete(review.id!)}
                      className="text-sm bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
