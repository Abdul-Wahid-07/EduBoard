"use client";
import { FaBroadcastTower, FaMobileAlt, FaCheck, FaGraduationCap, FaBuilding, FaHospital, FaLandmark } from "react-icons/fa";

const ServicesSection = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital communication solutions for modern institutions
          </p>
        </div>

        {/* Portals */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {/* Authority Portal */}
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                <FaBroadcastTower className="text-2xl text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Authority Portal
              </h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Create and manage notifications
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Target specific user groups
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Schedule announcements
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Track delivery status
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Analytics and reporting
              </li>
            </ul>
          </div>

          {/* User Portal */}
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-xl mr-4">
                <FaMobileAlt className="text-2xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">User Portal</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Receive instant notifications
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> View notification history
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Mark as read/unread
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Filter by categories
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Mobile responsive
              </li>
            </ul>
          </div>
        </div>

        {/* Use Cases (extra section) */}
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <FaGraduationCap className="text-4xl text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Educational Institutions</h4>
            <p className="text-sm text-gray-600">Schools, colleges, universities</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <FaBuilding className="text-4xl text-green-600 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Corporate Offices</h4>
            <p className="text-sm text-gray-600">Companies, startups, enterprises</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <FaHospital className="text-4xl text-red-600 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Healthcare</h4>
            <p className="text-sm text-gray-600">Hospitals, clinics, medical centers</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <FaLandmark className="text-4xl text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Government</h4>
            <p className="text-sm text-gray-600">Public offices, municipalities</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesSection;
