import React, { useState } from 'react';
// import './Contact.css'; // Import your CSS file if you have one
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import NavBra from './NavBra';
import axios from 'axios';


const Contact = () => {
  // const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Handle form submission logic here (e.g., send data to an API or email service)
    try {
      const response = await axios.post('https://backend-stivio.onrender.com/clotheswebsite/contact/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          message: ''
        }); // Clear the form after successful submission
      }
    } catch (error) {
      console.log(error)
    }
    setSubmitted(true);
  }
  
  return (
    <>
    <NavBra />
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-4xl font-bold mb-10 b flex justify-center">Contact Us</h1>
      <div className='border-4 p-10 '>
      <div className="flex flex-col md:flex-row gap-8 ">
        {/* Contact Information */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-4 font-medium">
            If you have any questions or need further information, please feel free to reach out to us.
          </p>
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-xl mr-3" />
            <a href="mailto:support@example.com" className="text-gray-500">support@example.com</a>
          </div>
          <div className="flex items-center">
            <FaPhone className="text-xl mr-3" />
            <a href="tel:+1234567890" className="text-gray-500">+123 456 7890</a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          {submitted ? (
            <p className="text-green-600">Thank you for reaching out! We will get back to you soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                on
                className="w-full bg-gray-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-gary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
