import { useState } from "react";
import { restaurantData } from "@/data/restaurant-data";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = [
    "All", 
    "☕ Drinks", 
    "🧀 Starters / Snacks", 
    "🍽️ Main Course", 
    "🍰 Desserts"
  ];
  
  // Create a mapping of display categories to actual data categories
  const categoryMap: Record<string, string> = {
    "All": "All",
    "☕ Drinks": "Drinks",
    "🧀 Starters / Snacks": "Starters / Snacks",
    "🍽️ Main Course": "Main Course",
    "🍰 Desserts": "Desserts"
  };
  
  const filteredMenuItems = activeCategory === "All" 
    ? restaurantData.menuItems 
    : restaurantData.menuItems.filter(item => item.category === categoryMap[activeCategory]);
  
  return (
    <section id="menu" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Menu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully crafted menu featuring a delightful selection of drinks, snacks, main courses, and desserts to satisfy every craving.
          </p>
        </div>
        
        {/* Menu Categories */}
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {categories.map((category, index) => (
            <button 
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-primary-color text-white' 
                  : 'bg-gray-200 hover:bg-primary-color hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Menu Items with Section Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCategory === "All" && (
            <>
              {/* Drinks Header */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center mt-8 mb-4">
                <h3 className="text-xl font-bold text-gray-800">☕ Drinks</h3>
                <div className="ml-4 flex-grow border-t border-gray-300"></div>
              </div>
              {/* Filter and display only Drinks items */}
              {restaurantData.menuItems
                .filter(item => item.category === "Drinks")
                .map((item, index) => (
                  <div key={`drinks-${index}`} className="menu-item bg-white rounded-lg overflow-hidden shadow-md">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}

              {/* Starters Header */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center mt-12 mb-4">
                <h3 className="text-xl font-bold text-gray-800">🧀 Starters / Snacks</h3>
                <div className="ml-4 flex-grow border-t border-gray-300"></div>
              </div>
              {/* Filter and display only Starters items */}
              {restaurantData.menuItems
                .filter(item => item.category === "Starters / Snacks")
                .map((item, index) => (
                  <div key={`starters-${index}`} className="menu-item bg-white rounded-lg overflow-hidden shadow-md">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}

              {/* Main Course Header */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center mt-12 mb-4">
                <h3 className="text-xl font-bold text-gray-800">🍽️ Main Course</h3>
                <div className="ml-4 flex-grow border-t border-gray-300"></div>
              </div>
              {/* Filter and display only Main Course items */}
              {restaurantData.menuItems
                .filter(item => item.category === "Main Course")
                .map((item, index) => (
                  <div key={`main-${index}`} className="menu-item bg-white rounded-lg overflow-hidden shadow-md">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}

              {/* Desserts Header */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center mt-12 mb-4">
                <h3 className="text-xl font-bold text-gray-800">🍰 Desserts</h3>
                <div className="ml-4 flex-grow border-t border-gray-300"></div>
              </div>
              {/* Filter and display only Desserts items */}
              {restaurantData.menuItems
                .filter(item => item.category === "Desserts")
                .map((item, index) => (
                  <div key={`desserts-${index}`} className="menu-item bg-white rounded-lg overflow-hidden shadow-md">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
            </>
          )}

          {/* For filtered categories, display without section headers */}
          {activeCategory !== "All" && filteredMenuItems.map((item, index) => (
            <div key={index} className="menu-item bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="https://dl.dropboxusercontent.com/scl/fi/egvey17j5hg72zgdvbhd6/Menu.pdf?rlkey=oes6l754xr9chvupvqq2fjc9h&st=myi40gk7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-secondary-color hover:bg-gray-800 text-white py-3 px-8 rounded-full font-medium transition duration-300 ease-in-out transform hover:scale-105"
          >
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
}
