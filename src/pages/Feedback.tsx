import { Header, Footer } from '../components/layout';
import ReviewForm from '../components/sections/ReviewForm';

export default function Feedback() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <ReviewForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

