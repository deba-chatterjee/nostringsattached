import { Button } from "@/components/ui/button";

export default function AboutSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };
  
  return (
    <section id="about" className="py-16 bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              A few months ago, five friends came together with a simple idea — to create a welcoming space where people could unwind, connect, and make memories. Whether you're catching up with old friends, celebrating life's milestones with family, or just taking a quiet moment for yourself, No Strings Attached was built to be your go-to place for good vibes, great food, and genuine connection.
            </p>
            <p className="text-gray-600 mb-4">
              Today, No Strings Attached is celebrated for its bold, innovative menu, inviting ambiance, and dedication to fresh, locally-sourced ingredients. Every dish is a reflection of our belief in storytelling through food — blending diverse flavors, cultural influences, and a touch of adventure. More than just a restaurant, we've become a community hub where conversations flow as freely as the laughter, and every visit feels like coming home.
            </p>
            <div className="mt-8">
              <Button
                onClick={scrollToContact}
                className="bg-primary-color hover:bg-[#6ba680] text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Contact Us
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Restaurant Interior" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="text-primary-color font-bold text-lg">Est. 2025</p>
                <p className="text-gray-600">Brew | Bites | Bliss</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
