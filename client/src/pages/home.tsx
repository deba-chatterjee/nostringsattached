import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import SpecialtiesSection from "@/components/specialties-section";
import MenuSection from "@/components/menu-section";
import AboutSection from "@/components/about-section";
import GallerySection from "@/components/gallery-section";

import ContactSection from "@/components/contact-section";
import MapSection from "@/components/map-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="font-poppins">
      <Navbar />
      <HeroSection />
      <SpecialtiesSection />
      <MenuSection />
      <AboutSection />
      <GallerySection />

      <ContactSection />
      <MapSection />
      <Footer />
    </div>
  );
}
