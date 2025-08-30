import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";

export default function DirectEmailJSTest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);

  // Initialize EmailJS when component mounts
  useEffect(() => {
    // Use the newly provided credentials from environment variables
    const PUBLIC_KEY = import.meta.env.YOUR_EMAILJS_PUBLIC_KEY || "bDcl60FvxPb0-rHKC";
    emailjs.init(PUBLIC_KEY);
    console.log("EmailJS initialized with user-provided key:", PUBLIC_KEY);
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: false, message: "" });

    try {
      // Use the newly provided credentials from environment variables
      const SERVICE_ID = import.meta.env.YOUR_EMAILJS_SERVICE_ID || "service_d44m74r";
      const TEMPLATE_ID = import.meta.env.YOUR_EMAILJS_TEMPLATE_ID || "template_kmc44i9";
      
      console.log("Using service ID:", SERVICE_ID);
      console.log("Using template ID:", TEMPLATE_ID);

      // Include ALL possible recipient field variations
      const templateParams = {
        from_name: name,
        reply_to: email,
        to_name: "No Strings Attached",
        to_email: "nostrings.cafe@gmail.com",
        recipient: "nostrings.cafe@gmail.com",
        email_to: "nostrings.cafe@gmail.com",
        // Add these additional variations
        to: "nostrings.cafe@gmail.com",
        email: "nostrings.cafe@gmail.com",
        recipient_email: "nostrings.cafe@gmail.com",
        destination: "nostrings.cafe@gmail.com",
        user_email: "nostrings.cafe@gmail.com",
        message: message,
      };

      console.log("Sending email with parameters:", {
        serviceId: SERVICE_ID,
        templateId: TEMPLATE_ID,
        templateParams,
      });

      // Send the email using the imported emailjs module
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
      );

      console.log("Email sent successfully:", result);
      setStatus({
        success: true,
        message: "Message sent successfully! We will get back to you soon.",
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus({
        success: false,
        message:
          "Failed to send message. Please try again or contact us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Direct EmailJS Test
      </h2>

      {status.message && (
        <div
          className={`p-4 mb-4 rounded-md ${status.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={sendEmail} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
