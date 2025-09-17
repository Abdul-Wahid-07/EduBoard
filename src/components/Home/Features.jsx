const Features = () => {
  const features = [
    {
      icon: "fas fa-bell",
      title: "Instant Notifications",
      desc: "Send real-time notifications and email to students",
      color: "from-blue-50 to-indigo-50 text-indigo-600",
    },
    {
      icon: "fas fa-users",
      title: "Role-Based Access",
      desc: "Different access levels for authority and students",
      color: "from-green-50 to-emerald-50 text-green-600",
    },
    {
      icon: "fas fa-chart-line",
      title: "Analytics Dashboard",
      desc: "Track notification delivery and engagement rates",
      color: "from-purple-50 to-pink-50 text-purple-600",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className={`text-center p-6 rounded-lg shadow-lg bg-gradient-to-br ${f.color}`}
            >
              <i className={`${f.icon} text-4xl mb-4`}></i>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
