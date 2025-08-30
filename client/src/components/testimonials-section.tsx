import { restaurantData } from "@/data/restaurant-data";

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read reviews from our satisfied customers who have experienced the authentic taste of Bengali cuisine.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurantData.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                  {testimonial.rating % 1 === 0.5 && (
                    <i className="fas fa-star-half-alt"></i>
                  )}
                </div>
                <span className="ml-2 text-gray-600">{testimonial.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-600 mb-6">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name} Avatar`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
