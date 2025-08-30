import { restaurantData } from "@/data/restaurant-data";
import logoImage from "@/assets/nsa-logo-white.png";

export default function Footer() {
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
    <footer className="bg-secondary-color text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <img src={logoImage} alt="No Strings Attached Logo" className="h-16" />
            </div>
            <p className="text-gray-300 mb-4">
              Experience the perfect blend of craft brews and delicious bites in our relaxed atmosphere. Our menu is crafted
              with care, designed to bring you pure culinary bliss in every visit.
            </p>
            <div className="flex space-x-4 mt-6">
              {restaurantData.socialMedia.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="text-gray-300 hover:text-primary-color transition-colors"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection("home")} className="text-gray-300 hover:text-primary-color transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection("menu")} className="text-gray-300 hover:text-primary-color transition-colors">Menu</button></li>
              <li><button onClick={() => scrollToSection("about")} className="text-gray-300 hover:text-primary-color transition-colors">About Us</button></li>
              <li><button onClick={() => scrollToSection("gallery")} className="text-gray-300 hover:text-primary-color transition-colors">Gallery</button></li>
              <li><button onClick={() => scrollToSection("contact")} className="text-gray-300 hover:text-primary-color transition-colors">Contact</button></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-color transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-color transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-primary-color"></i>
                <span className="text-gray-300">{restaurantData.contact.address}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-primary-color"></i>
                <span className="text-gray-300">{restaurantData.contact.phone}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-primary-color"></i>
                <span className="text-gray-300">{restaurantData.contact.email}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-3 text-primary-color"></i>
                <span className="text-gray-300">{restaurantData.contact.hours[0]}</span>
              </li>
            </ul>
          </div>
          

        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; 2025 No Strings Attached. All rights reserved.</p>
            <div className="flex space-x-4">
              {/* Payment method icons */}
              <svg className="h-8 w-12" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="30" rx="4" fill="#1A1F71"/>
                <path d="M23.5 10L25 20H21L19.5 10H23.5Z" fill="white"/>
                <path d="M30 10.2C29.2 10 28.2 9.8 27 9.8C24.6 9.8 22.8 11 22.8 12.8C22.8 14.2 24 15 25.6 15.4C27.2 15.8 27.6 16.2 27.6 16.6C27.6 17.2 26.8 17.6 26 17.6C25 17.6 24.2 17.4 23.2 17L22.8 16.8L22.4 19.4C23.4 19.8 24.6 20 26 20C28.6 20 30.2 18.8 30.2 17C30.2 15.8 29.4 15 27.8 14.4C26.8 14 26.2 13.8 26.2 13.2C26.2 12.8 26.6 12.4 27.8 12.4C28.8 12.4 29.4 12.6 30 12.8L30.4 13L30.8 10.6L30 10.2Z" fill="white"/>
                <path d="M37 10H34C33.4 10 33 10.2 32.8 10.8L30 20H32.6L33 18.6H36.2L36.4 20H39L37 10ZM33.8 16.4C33.8 16.4 34.8 13.8 35 13.2C35 13.4 35.4 14.6 35.4 14.6L35.8 16.4H33.8Z" fill="white"/>
                <path d="M18 10L15.6 16.8L15.4 15.8C15 14.2 13.6 12.4 12 11.4L14.2 20H16.8L20.8 10H18Z" fill="white"/>
              </svg>
              <svg className="h-8 w-12" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="30" rx="4" fill="#FF5F00"/>
                <path d="M30 22C33.3137 22 36 19.3137 36 16C36 12.6863 33.3137 10 30 10C26.6863 10 24 12.6863 24 16C24 19.3137 26.6863 22 30 22Z" fill="#EB001B"/>
                <path d="M30 22C33.3137 22 36 19.3137 36 16C36 12.6863 33.3137 10 30 10" fill="#F79E1B"/>
              </svg>
              <svg className="h-8 w-12" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="30" rx="4" fill="#2790C3"/>
                <path d="M32 15C32 17.2091 30.2091 19 28 19C25.7909 19 24 17.2091 24 15C24 12.7909 25.7909 11 28 11C30.2091 11 32 12.7909 32 15Z" fill="#FFFFFF"/>
                <path d="M36 15C36 17.2091 34.2091 19 32 19C29.7909 19 28 17.2091 28 15" fill="#D4DDE1"/>
              </svg>
              <svg className="h-8 w-12" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="30" rx="4" fill="#016FD0"/>
                <path d="M25 20H35V18H25V20Z" fill="white"/>
                <path d="M25 12H35V10H25V12Z" fill="white"/>
                <path d="M27 16C27 14.3431 28.3431 13 30 13C31.6569 13 33 14.3431 33 16C33 17.6569 31.6569 19 30 19C28.3431 19 27 17.6569 27 16Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
