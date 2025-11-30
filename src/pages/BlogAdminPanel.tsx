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
  orderBy 
} from 'firebase/firestore';
import { BlogPost } from '../types';
import Button from '../components/ui/Button';
import { auth, db } from '../config/firebase';

export default function BlogAdminPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author: 'Mr Abdul Syed',
    published: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        loadPosts();
      } else {
        setAuthenticated(false);
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'blog_posts'), orderBy('created_at', 'desc'));
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: editingPost ? formData.slug : generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ensure published is a boolean
      const postData = {
        ...formData,
        published: Boolean(formData.published),
      };
      
      console.log('💾 Saving blog post:', postData.title, 'Published:', postData.published);
      
      if (editingPost?.id) {
        const postRef = doc(db, 'blog_posts', editingPost.id);
        await updateDoc(postRef, {
          ...postData,
          updated_at: new Date().toISOString(),
        });
        console.log('✅ Blog post updated successfully');
      } else {
        await addDoc(collection(db, 'blog_posts'), {
          ...postData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        console.log('✅ Blog post created successfully');
      }
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        author: 'Mr Abdul Syed',
        published: false,
      });
      setEditingPost(null);
      loadPosts();
    } catch (error: any) {
      console.error('❌ Error saving blog post:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      alert(`Error saving blog post: ${error.message}`);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image || '',
      author: post.author || 'Mr Abdul Syed',
      published: post.published,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await deleteDoc(doc(db, 'blog_posts', id));
      loadPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Error deleting blog post. Please try again.');
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      // Ensure we're working with a boolean
      const currentStatus = Boolean(post.published);
      const newPublishedStatus = !currentStatus;
      console.log(`🔄 Toggling publish status for "${post.title}": ${currentStatus} → ${newPublishedStatus}`);
      const postRef = doc(db, 'blog_posts', post.id!);
      await updateDoc(postRef, {
        published: newPublishedStatus, // Explicitly set as boolean
        updated_at: new Date().toISOString(),
      });
      console.log(`✅ Successfully ${newPublishedStatus ? 'published' : 'unpublished'} blog post`);
      loadPosts();
    } catch (error: any) {
      console.error('❌ Error updating blog post:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      alert(`Error updating blog post: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!authenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel - Blog Management</h1>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/admin')} variant="secondary">
              Reviews
            </Button>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            <input
              type="text"
              placeholder="Slug (URL-friendly)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            <input
              type="text"
              placeholder="Excerpt (short description)"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            <input
              type="text"
              placeholder="Featured Image URL (optional)"
              value={formData.featured_image}
              onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <textarea
              placeholder="Content (HTML supported)"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              rows={12}
              required
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Published (visible on website)</span>
              </label>
            </div>
            <div className="flex gap-4">
              <Button type="submit">
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
              {editingPost && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditingPost(null);
                    setFormData({
                      title: '',
                      slug: '',
                      excerpt: '',
                      content: '',
                      featured_image: '',
                      author: 'Mr Abdul Syed',
                      published: false,
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">All Blog Posts ({posts.length})</h2>
          {loading ? (
            <p className="text-gray-600">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-600">No blog posts yet.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className={`border rounded-lg p-4 ${
                    post.published ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{post.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Slug: /blog/{post.slug}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          post.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="secondary"
                      onClick={() => togglePublish(post)}
                      className="text-sm"
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(post)}
                      className="text-sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleDelete(post.id!)}
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
