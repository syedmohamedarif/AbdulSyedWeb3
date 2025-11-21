import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { Hero, Services, ReviewsDisplay, ReviewForm } from './components/sections';
import ImageGallery from './components/sections/ImageGallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPost';
import Feedback from './pages/Feedback';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import BlogAdminPanel from './pages/BlogAdminPanel';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="about">
          <About />
        </section>
        <ImageGallery />
        <ReviewsDisplay />
        <section id="reviews-form" className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <ReviewForm />
          </div>
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/blog" element={<BlogAdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;