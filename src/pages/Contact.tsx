import Container from '../components/ui/Container';
import ContactForm from '../components/sections/ContactForm';
import ContactInfo from '../components/sections/ContactInfo';
import AppointmentForm from '../components/sections/AppointmentForm';

export default function Contact() {
  return (
    <main className="py-12 md:py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            If you have any questions or would like to schedule an appointment, please fill out one of the forms below or contact us using the information provided.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ContactInfo />
          <ContactForm />
        </div>

        <div className="mt-16" id="book-appointment">
          <AppointmentForm />
        </div>
      </Container>
    </main>
  );
}