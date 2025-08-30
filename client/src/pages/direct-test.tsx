import DirectEmailJSTest from '../direct-emailjs-test';

export default function DirectTest() {
  return (
    <div className="container py-12 mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Direct EmailJS Test</h1>
      <p className="text-center mb-8 text-gray-600">
        This page tests a direct implementation of EmailJS with hardcoded credentials.
      </p>
      <DirectEmailJSTest />
    </div>
  );
}