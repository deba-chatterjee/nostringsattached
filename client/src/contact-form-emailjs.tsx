import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";

// Define the schema for form validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Infer the type for form values from the schema
type FormValues = z.infer<typeof formSchema>;

export default function SimpleContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Use the newly provided credentials from environment variables
      const publicKey = import.meta.env.YOUR_EMAILJS_PUBLIC_KEY || "bDcl60FvxPb0-rHKC";
      const serviceId = import.meta.env.YOUR_EMAILJS_SERVICE_ID || "service_d44m74r";
      const templateId = import.meta.env.YOUR_EMAILJS_TEMPLATE_ID || "template_kmc44i9";

      console.log("Using EmailJS with credentials");

      // Initialize EmailJS
      emailjs.init(publicKey);

      // Send email with all possible recipient field variations
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
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
          message: data.message,
        }
      );

      console.log("Email sent successfully!", result.text);
      
      // Reset form and show success message
      form.reset();
      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Contact Us (Simple Form)</h2>
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Your message" 
                    rows={4} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
}