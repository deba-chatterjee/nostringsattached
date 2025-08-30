import SimpleContactForm from "../contact-form-emailjs";

export default function TestEmail() {
  return (
    <div className="container py-12 mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Email Test Page</h1>
      <SimpleContactForm />
    </div>
  );
}