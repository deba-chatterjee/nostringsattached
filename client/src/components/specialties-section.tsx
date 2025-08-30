import { restaurantData } from "@/data/restaurant-data";

export default function SpecialtiesSection() {
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Specialties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Signature dishes that showcase our culinary expertise with international flavors and local ingredients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {restaurantData.specialties.map((specialty, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <img 
                src={specialty.image} 
                alt={specialty.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{specialty.name}</h3>
                <p className="text-gray-600">{specialty.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
