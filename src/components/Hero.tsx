import Button from './ui/Button';

export default function Hero() {
  const handleBookAppointment = () => {
    const element = document.getElementById('book-appointment');
    if (element) {
      // Get navigation bar height dynamically
      const nav = document.querySelector('nav');
      const navHeight = nav ? nav.offsetHeight : 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight - 20; // Extra 20px padding
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-[300px] xs:min-h-[400px] sm:min-h-[500px] md:h-[600px]">
      <div className="absolute inset-0">
        <img
          src="/images/operationtheatre.jpeg"
          alt="Medical facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/40"></div>
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
            Consultant Breast Surgeon in Essex, UK
            <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">Mr Abdul Syed (MBBS, MRCSEd, FRCS)</p>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8">
            Leading oncoplastic breast surgeon serving in Essex with
            compassionate, patient-centred care and the latest surgical advances.
          </p>
          <div className="flex flex-col xs:flex-row space-y-3 xs:space-y-0 xs:space-x-4 items-center">
            <Button 
              className="w-full xs:w-auto text-center text-sm sm:text-base"
              onClick={handleBookAppointment}
            >
              Book Appointment
            </Button>
            <a 
              href="#services" 
              className="nav-link text-white hover:text-blue-200 text-sm sm:text-base px-4 py-2 border border-white rounded-md transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}