
import * as React from "react";
import { 
  Clock, 
  MapPin, 
  BellRing, 
  UserCheck, 
  HeartHandshake, 
  Hospital 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Location-Based Matching",
      description: "Our system matches blood donors with recipients based on proximity, ensuring quick response times.",
    },
    {
      icon: <BellRing className="h-6 w-6 text-primary" />,
      title: "Real-time Notifications",
      description: "Receive instant alerts when your blood type is needed at a nearby location.",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Emergency Response",
      description: "Prioritized matching system for emergency cases ensures critical needs are met first.",
    },
    {
      icon: <UserCheck className="h-6 w-6 text-primary" />,
      title: "Verified Donors",
      description: "All donors are pre-screened and verified for eligibility before donation.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-primary" />,
      title: "Donor Recognition",
      description: "Track your impact and receive acknowledgment for your life-saving contributions.",
    },
    {
      icon: <Hospital className="h-6 w-6 text-primary" />,
      title: "Hospital Dashboard",
      description: "Hospitals can manage blood inventory and request donations all in one place.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-10 bg-white relative overflow-hidden" id="features">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-red-50 opacity-70"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-green-50 opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Features Designed to <span className="text-primary">Save Lives</span>
          </h2>
          <p className="text-gray-600 text-lg animate-fade-in">
            BloodCall combines technology and community to create a seamless blood donation experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-md animate-fade-in hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 rounded-full bg-red-50 w-12 h-12 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
