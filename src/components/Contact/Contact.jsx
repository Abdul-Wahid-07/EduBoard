"use client";
import { useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaUser,
  FaCommentDots,
} from "react-icons/fa";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/contact`,
        formData
      );

      if (res.status === 200) {
        toast.success("Message sent successfully");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      }
    } catch (err) {
      console.log("Error sending message:", err);
      toast.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 sm:py-20 bg-gradient-to-tl from-blue-500 to-gray-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for support, feedback, or inquiries
          </p>
        </div>

        {/* Form and Map Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Left Side - Contact Form */}
          <div className="bg-white shadow-xl p-6 sm:p-8 md:p-10 rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-indigo-700 transition duration-200 disabled:opacity-70 cursor-pointer"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right Side - Google Map */}
          <div className="w-full h-64 sm:h-80 md:h-full rounded-2xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8925581115514!2d72.82194667395088!3d19.06846095221164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c96dfb95423f%3A0x38026e73d00969a5!2sRizvi%20College%20of%20Arts%2C%20Science%20and%20Commerce!5e0!3m2!1sen!2sin!4v1758194635190!5m2!1sen!2sin"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
