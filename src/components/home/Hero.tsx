
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Activity, ChevronRight } from "lucide-react";
import image from "@/public/image.png";


const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-100 px-6 md:px-10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-10 w-64 h-64 rounded-full bg-red-200 opacity-70 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-green-200 opacity-70 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 pt-20 pb-16 md:py-32 flex flex-col  md:flex-row items-center gap-12 md:gap-6">
        {/* Hero Content */}
        <div className="flex-1 md:max-w-[550px] animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-medium mb-6">
            <Activity className="h-3.5 w-3.5" />
            <span>Urgent need for blood donors</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-tight lg:leading-tight mb-6">
            Donate Blood,{" "}
            <span className="text-primary">Save Lives</span>
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-lg">
            BloodCall connects blood donors with hospitals and patients in need. Join our community and help save lives today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-primary hover:bg-blood-dark gap-2 w-full sm:w-auto">
                <Heart className="h-5 w-5" />
                Become a Donor
              </Button>
            </Link>
            <Link to="#how-it-works">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                How It Works
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span>5,000+ Donors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>10,000+ Lives Saved</span>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="flex-1 max-w-[800px]  w-full animate-fade-in animation-delay-200">
          <div className="relative aspect-square mr-40  md:aspect-auto md:h-[400px] w-full rounded-xl overflow-hidden glass">
            <div className="absolute inset-0 bg-gradient-to-tr from-blood/20 to-success/20"></div>
            <div className="absolute inset-1 rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt="Blood donation" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Stat Cards */}
            {/* <div className="absolute -bottom-6 -left-6 glass rounded-lg p-4 shadow-lg animate-pulse-subtle">
              <p className="text-primary font-bold text-2xl">A+</p>
              <p className="text-xs text-gray-600">Most needed type</p>
            </div>
            
            <div className="absolute -top-6 -right-6 glass rounded-lg p-4 shadow-lg animate-pulse-subtle">
              <p className="text-success font-bold text-2xl">15min</p>
              <p className="text-xs text-gray-600">Average donation time</p>
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
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
  );
};

export default Hero;
