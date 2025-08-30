export default function MapSection() {
  return (
    <section className="h-96 relative">
      <div className="absolute inset-0 bg-gray-300">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.186522891368!2d88.4300257748975!3d22.58266167941296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02759b93d4cf43%3A0xb5936d6c2c3fe5bd!2sSector%202%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1691766282784!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Restaurant Location"
        ></iframe>
      </div>
    </section>
  );
}
