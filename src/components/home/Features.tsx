
// import * as React from "react";
// import { 
//   Clock, 
//   MapPin, 
//   BellRing, 
//   UserCheck, 
//   HeartHandshake, 
//   Hospital 
// } from "lucide-react";

// const Features = () => {
//   const features = [
//     {
//       icon: <MapPin className="h-6 w-6 text-primary" />,
//       title: "Location-Based Matching",
//       description: "Our system matches blood donors with recipients based on proximity, ensuring quick response times.",
//     },
//     {
//       icon: <BellRing className="h-6 w-6 text-primary" />,
//       title: "Real-time Notifications",
//       description: "Receive instant alerts when your blood type is needed at a nearby location.",
//     },
//     {
//       icon: <Clock className="h-6 w-6 text-primary" />,
//       title: "Emergency Response",
//       description: "Prioritized matching system for emergency cases ensures critical needs are met first.",
//     },
//     {
//       icon: <UserCheck className="h-6 w-6 text-primary" />,
//       title: "Verified Donors",
//       description: "All donors are pre-screened and verified for eligibility before donation.",
//     },
//     {
//       icon: <HeartHandshake className="h-6 w-6 text-primary" />,
//       title: "Donor Recognition",
//       description: "Track your impact and receive acknowledgment for your life-saving contributions.",
//     },
//     {
//       icon: <Hospital className="h-6 w-6 text-primary" />,
//       title: "Hospital Dashboard",
//       description: "Hospitals can manage blood inventory and request donations all in one place.",
//     },
//   ];

//   return (
//     <section className="py-20 px-6 md:px-10 bg-white relative overflow-hidden" id="features">
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-red-50 opacity-70"></div>
//         <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-green-50 opacity-70"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Section Header */}
//         <div className="text-center mb-16 max-w-2xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
//             Features Designed to <span className="text-primary">Save Lives</span>
//           </h2>
//           <p className="text-gray-600 text-lg animate-fade-in">
//             BloodCall combines technology and community to create a seamless blood donation experience.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div 
//               key={index} 
//               className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-md animate-fade-in hover:-translate-y-1"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="mb-4 rounded-full bg-red-50 w-12 h-12 flex items-center justify-center">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;
"use client"
import { MapPin, BellRing, Clock, UserCheck, HeartHandshake, Hospital, Shield, Zap } from "lucide-react"
import map from "@/public/map.png";

const Features = () => {
  return (
    <section className="py-20 px-6 md:px-10 " id="features">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Features Designed to <span className="text-red-600">Save Lives</span>
          </h2>
          <p className="text-gray-600 text-lg">
            BloodCall combines technology and community to create a seamless blood donation experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Large Card - Location Based Matching (spans 2 cols) */}
          <div className="group lg:col-span-2 lg:row-span-2 bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-red-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <MapPin className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Location-Based Matching</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Our intelligent system matches blood donors with recipients based on proximity, ensuring the fastest
                possible response times during emergencies.
              </p>
              {/* Map Illustration */}
              <div className="relative h-48 rounded-xl overflow-hidden border-2 border-gray-200">
                <img
                  src={map}
                  alt="Location matching map"
                  className="w-full h-full object-cover"
                />                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm text-gray-700 font-medium">3 donors nearby</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Notifications */}
          <div className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <BellRing className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Alerts</h3>
            <p className="text-gray-600 text-sm">Instant notifications when your blood type is needed nearby.</p>
          </div>

          {/* Emergency Response */}
          <div className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-rose-300 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Clock className="h-6 w-6 text-rose-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Priority</h3>
            <p className="text-gray-600 text-sm">Critical cases are matched first with our priority system.</p>
          </div>

          {/* Verified Donors */}
          <div className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <UserCheck className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Donors</h3>
            <p className="text-gray-600 text-sm">All donors are pre-screened and verified before donation.</p>
          </div>

          {/* Donor Recognition */}
          <div className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-pink-300 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <HeartHandshake className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Impact Tracking</h3>
            <p className="text-gray-600 text-sm">Track your donations and see the lives you've helped save.</p>
          </div>

          {/* Hospital Dashboard - Wide card */}
          <div className="group lg:col-span-2 bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Hospital className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hospital Dashboard</h3>
                <p className="text-gray-600 text-sm">
                  Hospitals can manage blood inventory, track requests, and coordinate donations all in one unified
                  platform.
                </p>
              </div>
              {/* Mini Dashboard Preview */}
              <div className="flex-1 bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">Blood Inventory</span>
                  <span className="text-xs text-emerald-600 font-medium">Live</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["A+", "B+", "O+", "AB+"].map((type) => (
                    <div key={type} className="text-center">
                      <div className="text-gray-900 font-semibold text-sm">{type}</div>
                      <div className="h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${Math.random() * 60 + 40}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-violet-300 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Shield className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Privacy</h3>
            <p className="text-gray-600 text-sm">Your health data is encrypted and securely stored.</p>
          </div>

          {/* Fast Matching */}
          <div className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Zap className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Matching</h3>
            <p className="text-gray-600 text-sm">AI-powered matching connects donors in under 60 seconds.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
