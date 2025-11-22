import Container from '../components/ui/Container';
import Biography from '../components/sections/about/Biography';
import ConsultantPosts from '../components/sections/about/ConsultantPosts';
import ResearchInterests from '../components/sections/about/ResearchInterests';
import Publications from '../components/sections/about/Publications';
import Courses from '../components/sections/about/Courses';
import AreasOfInterest from '../components/sections/about/AreasOfInterest';

export default function About() {
  return (
    <main className="py-12 md:py-20 bg-gray-50">
      <Container>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">About Abdul Syed - Consultant Breast Surgeon in Essex, UK</h1>
          
          <Biography className="mb-12" />
          <AreasOfInterest className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <img
              src= '/images/half.jpg'
              alt="Abdul Syed breast surgeon - Leading breast surgeon in Essex providing expert consultation"
              className="rounded-lg shadow-lg w-full"
            />
            <ConsultantPosts />
            <ResearchInterests />
            <Courses />
          </div>

          <Publications />

        </div>
      </Container>
    </main>
  );
}