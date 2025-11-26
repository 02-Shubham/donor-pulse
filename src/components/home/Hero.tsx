
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Activity, ChevronRight,ArrowRight } from "lucide-react";
import image from "@/public/image.png";
import HoverCounter from "@/components/number-hover";

const AnimatedCounter = ({
  targetValue,
  suffix,
  isHovered,
}: {
  targetValue: number
  suffix: string
  isHovered: boolean
}) => {
  const [count, setCount] = React.useState(0)
  const [hasAnimated, setHasAnimated] = React.useState(false)

  React.useEffect(() => {
    if (isHovered && !hasAnimated) {
      setHasAnimated(true)
      const duration = 1500
      const steps = 60
      const increment = targetValue / steps
      const stepDuration = duration / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= targetValue) {
          setCount(targetValue)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, stepDuration)

      return () => clearInterval(timer)
    }
  }, [isHovered, hasAnimated, targetValue])

  React.useEffect(() => {
    if (!isHovered && hasAnimated) {
      // Reset after mouse leaves so it can animate again
      const timeout = setTimeout(() => {
        setCount(0)
        setHasAnimated(false)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [isHovered, hasAnimated])

  const displayValue = hasAnimated || isHovered ? `${count.toLocaleString()}+` : `${targetValue.toLocaleString()}+`

  return (
    <span className="font-semibold tabular-nums">
      {displayValue} {suffix}
    </span>
  )
}


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
          
           <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
            BloodCall connects{" "}
            <span className="font-semibold text-gray-900 bg-red-100 px-1.5 py-0.5 rounded transition-all duration-300 hover:bg-red-200">
              blood donors
            </span>{" "}
            <span className="inline-flex items-center gap-1 text-red-600 font-medium">
              <ArrowRight className="h-5 w-5" />
            </span>{" "}
            <span className="font-semibold text-gray-900 bg-blue-100 px-1.5 py-0.5 rounded transition-all duration-300 hover:bg-blue-200">
              hospitals
            </span>{" "}
            and patients in need. Join our community and help save lives today.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-primary hover:bg-blood-dark gap-2 w-full sm:w-auto">
                <Heart className="h-5 w-5" />
                Become a Donor
              </Button>
            </Link>
            <Link to="/howitswork">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                How It Works
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span><HoverCounter target={5000} />+ Donors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span><HoverCounter target={10000} />+ Lives Saved</span>
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