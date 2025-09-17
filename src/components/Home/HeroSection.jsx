const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">Digital Board System</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Streamline communication between authorities and users with instant
          notifications, announcements, and updates. Perfect for schools,
          offices, and organizations.
        </p>
        <div className="space-x-4">
          <a
            href="/signup"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-200"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
