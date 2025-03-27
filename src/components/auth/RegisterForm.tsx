
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import BloodTypeSelector from "./BloodTypeSelector";
import SocialLoginButtons from "./SocialLoginButtons";
import FormFooter from "./FormFooter";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

type UserRole = "donor" | "recipient" | "hospital";

const RegisterForm = () => {
  const [userRole, setUserRole] = useState<UserRole>("donor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make sure donor has selected a blood type
      if (userRole === "donor" && !bloodType) {
        throw new Error("Please select your blood type");
      }
      
      await register({
        name,
        email,
        password,
        role: userRole,
        blood_type: bloodType || undefined,
      });
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <Input 
            id="name" 
            type="text" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>I am a</Label>
        <RadioGroup 
          value={userRole} 
          onValueChange={(value) => setUserRole(value as UserRole)} 
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="donor" id="donor" className="text-primary" />
            <Label htmlFor="donor" className="cursor-pointer">Blood Donor</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="recipient" id="recipient" className="text-primary" />
            <Label htmlFor="recipient" className="cursor-pointer">Blood Recipient</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hospital" id="hospital" className="text-primary" />
            <Label htmlFor="hospital" className="cursor-pointer">Hospital/Blood Bank</Label>
          </div>
        </RadioGroup>
      </div>
      
      {userRole === "donor" && (
        <BloodTypeSelector bloodType={bloodType} setBloodType={setBloodType} />
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Input 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-blood-dark transition-colors"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          </div>
        ) : "Create Account"}
      </Button>
      
      <SocialLoginButtons />
      <FormFooter type="register" />
    </form>
  );
};

export default RegisterForm;
