// src/app/about/page.tsx  (Next.js App Router)
"use client";
import { FaLightbulb, FaShieldAlt, FaHeart } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            About EduBoard
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing institutional communication through intelligent
            digital board systems
          </p>
        </div>

        {/* Mission + Stats */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Mission */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">
              Our Mission
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              EduBoard was created to bridge the communication gap in educational
              institutions and organizations. Effective communication is the
              backbone of success — whether in schools, colleges, or corporate
              offices.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our platform empowers authorities like teachers, managers,
              principals, and administrators to instantly reach their audience
              with important announcements, updates, and notifications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With EduBoard, missed announcements, delays, and breakdowns in
              communication become a thing of the past.
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white shadow-xl rounded-2xl p-10">
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-indigo-600">10K+</div>
                <p className="text-gray-600 mt-2">Active Users</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600">500+</div>
                <p className="text-gray-600 mt-2">Institutions</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600">1M+</div>
                <p className="text-gray-600 mt-2">Notifications Sent</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600">99.9%</div>
                <p className="text-gray-600 mt-2">Uptime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-6 text-center bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaLightbulb className="text-2xl text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Innovation</h4>
            <p className="text-gray-600">
              Cutting-edge technology solving real-world communication challenges.
            </p>
          </div>

          <div className="p-6 text-center bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-green-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaShieldAlt className="text-2xl text-green-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Security</h4>
            <p className="text-gray-600">
              Enterprise-grade protection for sensitive institutional data.
            </p>
          </div>

          <div className="p-6 text-center bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-purple-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <FaHeart className="text-2xl text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Support</h4>
            <p className="text-gray-600">
              24/7 dedicated assistance ensuring smooth operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
