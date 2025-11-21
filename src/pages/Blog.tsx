import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { BlogPost } from '../types';
import Container from '../components/ui/Container';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const q = query(
        collection(db, 'blog_posts'),
        where('published', '==', true),
        orderBy('created_at', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const postsData: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        postsData.push({
          id: doc.id,
          ...doc.data(),
        } as BlogPost);
      });
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <main className="py-12 md:py-20 bg-gray-50 min-h-screen">
        <Container>
          <div className="text-center">
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Blog
          </h1>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Insights, updates, and information about breast surgery and patient care
          </p>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {post.featured_image && (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      {post.author && <span>By {post.author}</span>}
                      {post.created_at && <span>{formatDate(post.created_at)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
