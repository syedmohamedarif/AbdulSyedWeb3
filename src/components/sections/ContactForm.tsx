import { useState } from 'react';
import Button from '../ui/Button';
import { validateEmail, validateRequired } from '../../utils/validation';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!validateRequired(formData.firstName)) newErrors.firstName = 'First name is required';
    if (!validateRequired(formData.lastName)) newErrors.lastName = 'Last name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!validateRequired(formData.message)) newErrors.message = 'Message is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: '4fbe02f3-f235-4742-879f-87bf078bff86',
            subject: 'New Contact Form Submission',
            from_name: `${formData.firstName} ${formData.lastName}`,
            reply_to: formData.email,
            to_email: 'syedmohamedarif03@gmail.com',
            message: `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}
            `.trim(),
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setSubmitStatus('success');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
          });
        } else {
          throw new Error(result.message || 'Failed to submit form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send us a Message</h3>
      
      {submitStatus === 'success' && (
        <div className="mb-4 p-3 sm:p-4 bg-green-100 text-green-700 rounded-lg text-sm sm:text-base">
          Message sent successfully!
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-4 p-3 sm:p-4 bg-red-100 text-red-700 rounded-lg text-sm sm:text-base">
          Error sending message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          {errors.firstName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          {errors.lastName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastName}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone (555) 555-5555"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>
        <div className="sm:col-span-2">
          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            rows={4}
          ></textarea>
          {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" className="w-full text-sm sm:text-base" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  );
}