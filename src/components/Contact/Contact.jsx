// src/app/contact/page.tsx (App Router)
// or src/components/ContactForm.tsx
"use client";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";

const ContactForm = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for support, feedback, or inquiries
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-indigo-100 p-4 rounded-lg mr-4">
                <FaMapMarkerAlt className="text-xl text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Address</h4>
                <p className="text-gray-600">
                  123 Education Street <br />
                  Tech City, TC 12345 <br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 p-4 rounded-lg mr-4">
                <FaPhone className="text-xl text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Phone</h4>
                <p className="text-gray-600">
                  +1 (555) 123-4567 <br />
                  +1 (555) 987-6543
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-4 rounded-lg mr-4">
                <FaEnvelope className="text-xl text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Email</h4>
                <p className="text-gray-600">
                  info@eduboard.com <br />
                  support@eduboard.com
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Interactive Map Location</p>
                <p className="text-sm text-gray-400">Google Maps integration here</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white shadow-xl p-10 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <div className="relative">
                  <FaCommentDots className="absolute left-3 top-3.5 text-gray-400" />
                  <textarea
                    rows={4}
                    placeholder="Type your message here..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
