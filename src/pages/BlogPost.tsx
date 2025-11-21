import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { BlogPost } from '../types';
import Container from '../components/ui/Container';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadBlogPost(slug);
    }
  }, [slug]);

  const loadBlogPost = async (postSlug: string) => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', postSlug)
        .eq('published', true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error loading blog post:', error);
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
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </Container>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="py-12 md:py-20 bg-gray-50 min-h-screen">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="text-blue-900 hover:text-blue-700 underline"
            >
              ← Back to Blog
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="text-blue-900 hover:text-blue-700 mb-6 inline-block"
          >
            ← Back to Blog
          </Link>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            )}
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b">
                {post.author && <span>By {post.author}</span>}
                {post.created_at && <span>{formatDate(post.created_at)}</span>}
              </div>
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>
        </div>
      </Container>
    </main>
  );
}

