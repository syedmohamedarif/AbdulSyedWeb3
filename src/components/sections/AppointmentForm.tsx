import { useState } from 'react';
import Button from '../ui/Button';

interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
}

export default function AppointmentForm() {
  const [formData, setFormData] = useState<AppointmentData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSubmitStatus('idle');
      
      const formattedMessage = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Preferred Date: ${formData.date}
Additional Notes: ${formData.message}
      `.trim();

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '4fbe02f3-f235-4742-879f-87bf078bff86',
          subject: 'New Appointment Request',
          from_name: formData.name,
          reply_to: formData.email,
          to_email: 'syedmohamedarif03@gmail.com',
          message: formattedMessage,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
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
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Book an Appointment</h3>
      
      {submitStatus === 'success' && (
        <p className="mb-4 text-green-600">Appointment request sent successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p className="mb-4 text-red-600">Error sending appointment request. Please try again.</p>
      )}
      
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        required
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        required
      />
      <textarea
        placeholder="Additional Notes"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        rows={4}
      ></textarea>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Sending...' : 'Book Appointment'}
      </Button>
    </form>
  );
}