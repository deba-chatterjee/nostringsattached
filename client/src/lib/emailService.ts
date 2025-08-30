import emailjs from '@emailjs/browser';

// Configure EmailJS using direct values
const PUBLIC_KEY = "bZYcJgpYXXMqV_LkV"; // EmailJS public key
const SERVICE_ID = "nostrings_cafe"; // EmailJS service ID  
const TEMPLATE_ID = "template_7k5ygvx"; // EmailJS template ID

// Ensure EmailJS SDK is loaded
let isEmailJSLoaded = false;
let isLoadingScript = false;

// Function to load the EmailJS SDK
async function loadEmailJSSDK(): Promise<boolean> {
  if (isEmailJSLoaded) return true;
  if (isLoadingScript) {
    // Wait for the script to load if it's already being loaded
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (isEmailJSLoaded) {
          clearInterval(checkInterval);
          resolve(true);
        }
      }, 100);
    });
  }

  isLoadingScript = true;

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.emailjs.com/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      console.log('EmailJS SDK loaded successfully');
      isEmailJSLoaded = true;
      isLoadingScript = false;
      
      // Initialize EmailJS after the script is loaded
      window.emailjs.init(PUBLIC_KEY);
      resolve(true);
    };
    script.onerror = () => {
      console.error('Failed to load EmailJS SDK');
      isLoadingScript = false;
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

interface EmailParams {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Sends an email using EmailJS
 * @param params Email parameters
 * @returns Promise that resolves to true if email was sent successfully
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    // First ensure the EmailJS SDK is loaded
    const isLoaded = await loadEmailJSSDK();
    if (!isLoaded) {
      throw new Error('EmailJS SDK failed to load');
    }

    // Map subject codes to readable text
    const subjectMap: Record<string, string> = {
      'reservation': 'Table Reservation',
      'feedback': 'Feedback',
      'catering': 'Catering Services',
      'other': 'General Inquiry'
    };

    // Set up template parameters for EmailJS
    const templateParams = {
      from_name: params.name,
      reply_to: params.email,
      to_name: "No Strings Attached",
      phone: params.phone || "Not provided",
      subject: subjectMap[params.subject] || params.subject,
      message: params.message
    };

    console.log("EmailJS configuration:", {
      serviceId: SERVICE_ID,
      templateId: TEMPLATE_ID, 
      publicKey: PUBLIC_KEY.substring(0, 3) + "..." // Just show first 3 chars for security
    });
    
    // Send the email using EmailJS (use 'emailjs' directly from import if window.emailjs fails)
    const emailjsLib = window.emailjs || emailjs;
    const result = await emailjsLib.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log("Email sent successfully:", result.text);
    return true;
  } catch (error) {
    console.error("Failed to send email with EmailJS:", error);
    return false;
  }
}