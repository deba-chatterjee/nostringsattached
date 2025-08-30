import { restaurantData } from "@/data/restaurant-data";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Food Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A visual feast of our most popular dishes captured in all their mouthwatering glory.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {restaurantData.galleryImages.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg group">
              <img 
                src={image.image} 
                alt={image.title} 
                className="w-full h-60 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-lg">{image.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
