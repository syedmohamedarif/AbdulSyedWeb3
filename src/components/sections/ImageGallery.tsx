import Container from '../ui/Container';
import consultation1 from '/images/operate.jpg';
import consultation2 from "/images/probe.png";
import consultation3 from "/images/pink.png";

const images = [
  {
    url: consultation1,
    alt: "Abdul Syed breast surgeon consulting with patient - Best breast surgeon in UK",
  },
  {
    url: consultation2,
    alt: "Leading breast surgeon in Essex providing expert breast care consultation",
  },
  {
    url: consultation3,
    alt: "Top breast surgeon in UK - Abdul Syed providing comprehensive breast surgery services",
  },
];

export default function ImageGallery() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}