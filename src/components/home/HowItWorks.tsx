// import { 
//   UserPlus, 
//   Bell, 
//   Map, 
//   Droplet, 
//   CheckCircle, 
//   Award 
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const HowItWorks = () => {
//   const steps = [
//     {
//       icon: <UserPlus className="h-6 w-6" />,
//       title: "Register as a Donor",
//       description: "Sign up and create your donor profile with blood type and location information.",
//       color: "bg-red-50 text-primary",
//       delay: 0,
//     },
//     {
//       icon: <Bell className="h-6 w-6" />,
//       title: "Receive Notifications",
//       description: "Get alerts when your blood type is needed at a hospital near you.",
//       color: "bg-orange-50 text-orange-600",
//       delay: 100,
//     },
//     {
//       icon: <Map className="h-6 w-6" />,
//       title: "Accept Request",
//       description: "Confirm your availability and get directions to the donation location.",
//       color: "bg-yellow-50 text-yellow-600",
//       delay: 200,
//     },
//     {
//       icon: <Droplet className="h-6 w-6" />,
//       title: "Donate Blood",
//       description: "Visit the hospital or blood bank to make your life-saving donation.",
//       color: "bg-green-50 text-success",
//       delay: 300,
//     },
//     {
//       icon: <CheckCircle className="h-6 w-6" />,
//       title: "Verification",
//       description: "The hospital verifies your donation and updates the blood inventory.",
//       color: "bg-blue-50 text-blue-600",
//       delay: 400,
//     },
//     {
//       icon: <Award className="h-6 w-6" />,
//       title: "Receive Recognition",
//       description: "Get thanked for your contribution and track your donation history.",
//       color: "bg-purple-50 text-purple-600",
//       delay: 500,
//     },
//   ];

//   return (
//     <div>
//        <section className="py-20 px-6 md:px-10 bg-gray-50" id="how-it-works">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-16 max-w-2xl mx-auto">
//           <h2 className="text-4xl md:text-4xl font-bold mb-6 animate-fade-in">
//             How <span className="text-primary">Blood Call</span> Works
//           </h2>
//           <p className="text-grey-600 text-lg animate-fade-in">
//             Our streamlined process makes blood donation simple, efficient, and rewarding.
//           </p>
//         </div>

//         {/* Process Steps */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-md animate-fade-in hover:-translate-y-1"
//               style={{ animationDelay: `${step.delay}ms` }}
//             >
//               <div className={cn("mb-4 rounded-full w-12 h-12 flex items-center justify-center", step.color)}>
//                 {step.icon}
//               </div>
//               <div className="flex items-center gap-2 mb-3">
//                 <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
//                   {index + 1}
//                 </div>
//                 <h3 className="text-xl font-semibold">{step.title}</h3>
//               </div>
//               <p className="text-gray-600">{step.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Statistics Section */}
//         <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
//           <div className="glass rounded-xl p-8 text-center">
//             <p className="text-4xl font-bold text-primary mb-2">5,000+</p>
//             <p className="text-gray-600">Registered Donors</p>
//           </div>
//           <div className="glass rounded-xl p-8 text-center">
//             <p className="text-4xl font-bold text-primary mb-2">10,000+</p>
//             <p className="text-gray-600">Lives Saved</p>
//           </div>
//           <div className="glass rounded-xl p-8 text-center">
//             <p className="text-4xl font-bold text-primary mb-2">98%</p>
//             <p className="text-gray-600">Successful Matches</p>
//           </div>
//         </div>
//       </div>
//     </section>
//     <div className="absolute bottom-0 left-0 right-0">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
//           <path 
//             fill="#ffffff" 
//             fillOpacity="1" 
//             d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
//           ></path>
//         </svg>
//     </div>
//     </div>
   
//   );
// };

// export default HowItWorks;
import { UserPlus, Bell, Map, Droplet, CheckCircle, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import HoverCounter from "@/components/number-hover";

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: "Register as a Donor",
      description: "Sign up and create your donor profile with blood type and location information.",
      color: "bg-red-50 text-red-600 group-hover:bg-red-100",
      borderColor: "border-red-200 hover:border-red-300",
      delay: 0,
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Receive Notifications",
      description: "Get alerts when your blood type is needed at a hospital near you.",
      color: "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
      borderColor: "border-orange-200 hover:border-orange-300",
      delay: 100,
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: "Accept Request",
      description: "Confirm your availability and get directions to the donation location.",
      color: "bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100",
      borderColor: "border-yellow-200 hover:border-yellow-300",
      delay: 200,
    },
    {
      icon: <Droplet className="h-6 w-6" />,
      title: "Donate Blood",
      description: "Visit the hospital or blood bank to make your life-saving donation.",
      color: "bg-green-50 text-green-600 group-hover:bg-green-100",
      borderColor: "border-green-200 hover:border-green-300",
      delay: 300,
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Verification",
      description: "The hospital verifies your donation and updates the blood inventory.",
      color: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
      borderColor: "border-blue-200 hover:border-blue-300",
      delay: 400,
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Receive Recognition",
      description: "Get thanked for your contribution and track your donation history.",
      color: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
      borderColor: "border-purple-200 hover:border-purple-300",
      delay: 500,
    },
  ]

  return (
    <div>
      <section className="py-20 px-6 md:px-10 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-4xl font-bold mb-6 animate-fade-in">
              How <span className="text-red-600">Blood Call</span> Works ?
            </h2>
            <p className="text-gray-600 text-lg animate-fade-in">
              Our streamlined process makes blood donation simple, efficient, and rewarding.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "group bg-white rounded-xl p-6 transition-all duration-300",
                  "border-2 shadow-sm hover:shadow-lg hover:-translate-y-1",
                  step.borderColor,
                )}
                style={{ animationDelay: `${step.delay}ms` }}
              >
                <div
                  className={cn(
                    "mb-4 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300",
                    "group-hover:scale-110 group-hover:rotate-6",
                    step.color,
                  )}
                >
                  {step.icon}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Statistics Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="bg-white rounded-xl p-8 text-center border-2 border-red-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300">
              <p className="text-4xl font-bold text-red-600 mb-2"><HoverCounter target={5000} />+</p>
              <p className="text-gray-600">Registered Donors</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center border-2 border-red-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300">
              <p className="text-4xl font-bold text-red-600 mb-2"><HoverCounter target={10000} />+</p>
              <p className="text-gray-600">Lives Saved</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center border-2 border-red-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300">
              <p className="text-4xl font-bold text-red-600 mb-2"><HoverCounter target={98} />%</p>
              <p className="text-gray-600">Successful Matches</p>
            </div>
          </div>
        </div>
      </section>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default HowItWorks;
