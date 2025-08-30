import { useState, useEffect } from "react";
import { Link } from "wouter";
import logoImage from "@/assets/nsa-logo-dark-text.png";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const scrollToSection = (sectionId: string) => {
    closeMobileMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };
  
  return (
    <nav className={`bg-white shadow-md fixed w-full z-10 transition-all ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <img 
                src={logoImage} 
                alt="No Strings Attached Logo" 
                className="h-20 max-w-full object-contain" 
                style={{ background: 'transparent' }} 
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection("home")} className="font-medium text-gray-700 hover:text-primary-color transition">Home</button>
            <button onClick={() => scrollToSection("menu")} className="font-medium text-gray-700 hover:text-primary-color transition">Menu</button>
            <button onClick={() => scrollToSection("about")} className="font-medium text-gray-700 hover:text-primary-color transition">About</button>
            <button onClick={() => scrollToSection("gallery")} className="font-medium text-gray-700 hover:text-primary-color transition">Gallery</button>
            <button onClick={() => scrollToSection("contact")} className="font-medium text-gray-700 hover:text-primary-color transition">Contact</button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-primary-color focus:outline-none">
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} pb-4 pt-2`}>
          <div className="flex flex-col space-y-4">
            <button onClick={() => scrollToSection("home")} className="font-medium text-gray-700 hover:text-primary-color transition">Home</button>
            <button onClick={() => scrollToSection("menu")} className="font-medium text-gray-700 hover:text-primary-color transition">Menu</button>
            <button onClick={() => scrollToSection("about")} className="font-medium text-gray-700 hover:text-primary-color transition">About</button>
            <button onClick={() => scrollToSection("gallery")} className="font-medium text-gray-700 hover:text-primary-color transition">Gallery</button>
            <button onClick={() => scrollToSection("contact")} className="font-medium text-gray-700 hover:text-primary-color transition">Contact</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
