import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { restaurantData } from "@/data/restaurant-data";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Reset the success state when form is changed after successful submission
  useEffect(() => {
    const subscription = form.watch(() => {
      if (formSuccess) {
        setFormSuccess(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, formSuccess]);

  // Initialize EmailJS when component mounts
  useEffect(() => {
    // Use the newly provided credentials from environment variables
    const PUBLIC_KEY = import.meta.env.YOUR_EMAILJS_PUBLIC_KEY || "bDcl60FvxPb0-rHKC";
    emailjs.init(PUBLIC_KEY);
    console.log('EmailJS initialized with user-provided key:', PUBLIC_KEY);
  }, []);

  // Function to send email directly from client using EmailJS
  const sendDirectEmail = async (data: ContactFormValues) => {
    try {
      // Use the newly provided credentials from environment variables
      const SERVICE_ID = import.meta.env.YOUR_EMAILJS_SERVICE_ID || "service_d44m74r";
      const TEMPLATE_ID = import.meta.env.YOUR_EMAILJS_TEMPLATE_ID || "template_kmc44i9";

      console.log("Using service ID:", SERVICE_ID);
      console.log("Using template ID:", TEMPLATE_ID);

      // Map subject codes to readable text
      const subjectMap: Record<string, string> = {
        reservation: "Table Reservation",
        feedback: "Feedback",
        catering: "Catering Services",
        other: "General Inquiry",
      };

      // Set up template parameters with all possible recipient variations
      const templateParams = {
        from_name: data.name,
        reply_to: data.email,
        to_name: "No Strings Attached",
        to_email: "nostrings.cafe@gmail.com",
        recipient: "nostrings.cafe@gmail.com",
        email_to: "nostrings.cafe@gmail.com",
        to: "nostrings.cafe@gmail.com",
        email: "nostrings.cafe@gmail.com",
        recipient_email: "nostrings.cafe@gmail.com",
        destination: "nostrings.cafe@gmail.com",
        user_email: "nostrings.cafe@gmail.com",
        phone: data.phone || "Not provided",
        subject: subjectMap[data.subject] || data.subject,
        message: data.message,
      };

      console.log("Sending email with parameters:", {
        serviceId: SERVICE_ID,
        templateId: TEMPLATE_ID,
        templateParams
      });

      // Send the email directly using EmailJS
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );

      console.log("Email sent successfully:", result);
      return true;
    } catch (error) {
      console.error("Failed to send email with EmailJS:", error);
      return false;
    }
  };

  // Submit handler for the form
  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    try {
      // First try to store the message in the database
      let dbSaved = false;
      try {
        const response = await apiRequest("POST", "/api/contact", data);
        await response.json();
        console.log("Contact form saved to database");
        dbSaved = true;
      } catch (apiError) {
        console.error("Could not save to database:", apiError);
      }

      // Send email directly using EmailJS
      console.log("Attempting to send email with EmailJS");
      const emailSent = await sendDirectEmail(data);

      setIsSubmitting(false);

      if (emailSent) {
        // Show success message
        setFormSuccess(true);
        form.reset();

        toast({
          title: "Message Sent Successfully!",
          description:
            "Thank you for your message. We'll get back to you soon.",
        });
      } else if (dbSaved) {
        // If email failed but database saved, show partial success
        toast({
          title: "Message Received",
          description:
            "Your message was received but there was an issue sending the email notification. We'll still get back to you soon!",
          variant: "default",
        });
        form.reset();
      } else {
        // If both failed, show error
        toast({
          title: "Submission Error",
          description:
            "There was a problem sending your message. Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);

      toast({
        title: "Submission Error",
        description:
          "There was a problem with your submission. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-8">
              Have questions or want to make a reservation? Reach out to us
              through any of the methods below, and we'll get back to you as
              soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-primary-color mr-4">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Address</h3>
                  <p className="text-gray-600">
                    {restaurantData.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-primary-color mr-4">
                  <i className="fas fa-phone-alt text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600">
                    {restaurantData.contact.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-primary-color mr-4">
                  <i className="fas fa-envelope text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">
                    {restaurantData.contact.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-primary-color mr-4">
                  <i className="fas fa-clock text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Opening Hours</h3>
                  <p className="text-gray-600">
                    {restaurantData.contact.hours.map((hour, index) => (
                      <span key={index}>
                        {hour}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {restaurantData.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="bg-secondary-color text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-color transition-colors"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

              {formSuccess ? (
                <div className="rounded-lg bg-green-50 p-6 border border-green-200">
                  <h4 className="text-xl font-semibold text-green-700 mb-3">
                    <i className="fas fa-check-circle mr-2"></i>
                    Message Sent Successfully!
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Thank you for your message. We have received your inquiry
                    and will get back to you as soon as possible.
                  </p>

                  <Button
                    onClick={() => {
                      setFormSuccess(false);
                      form.reset();
                    }}
                    className="bg-primary-color hover:bg-[#6ba680] text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out w-full"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    ref={formRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Your Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Your Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="john@example.com"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+91 98765 43210"
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Subject
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="reservation">
                                Table Reservation
                              </SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="catering">
                                Catering Services
                              </SelectItem>
                              <SelectItem value="other">
                                General Inquiry
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Your Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us what you'd like to know..."
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary-color hover:bg-[#6ba680] text-white font-semibold w-full py-3 px-8 rounded-lg transition duration-300 ease-in-out"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Sending...
                        </>
                      ) : (
                        <>Send Message</>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}