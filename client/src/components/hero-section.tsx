import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-white py-20">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="No Strings Attached Restaurant Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          No Strings <span className="text-primary-color">Attached</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          <span className="text-accent-color">Brew</span> | <span className="text-white">Bites</span> | <span className="text-primary-color">Bliss</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => scrollToSection("menu")}
            className="bg-primary-color hover:bg-[#6ba680] text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            View Our Menu
          </Button>
          <Button 
            onClick={() => scrollToSection("contact")}
            variant="outline"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary-color text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
