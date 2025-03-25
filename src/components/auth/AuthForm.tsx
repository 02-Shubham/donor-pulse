
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type UserRole = "donor" | "recipient" | "hospital";

interface AuthFormProps {
  type: "login" | "register";
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const [userRole, setUserRole] = useState<UserRole>("donor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (type === "login") {
        toast({
          title: "Success!",
          description: "You have successfully logged in.",
        });
      } else {
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
      }

      // Redirect would happen here
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <Card className="w-full max-w-md mx-auto glass animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {type === "login" ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription className="text-center">
          {type === "login" 
            ? "Enter your credentials to sign in to your account" 
            : "Fill in the details below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
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
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodTypes.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant="outline"
                        className={cn(
                          "h-10",
                          bloodType === type && "bg-primary text-white hover:bg-primary/90"
                        )}
                        onClick={() => setBloodType(type)}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {type === "login" && (
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              )}
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
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
            ) : type === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.09 19c-5 0-9-3.36-9-7.5 0-4.14 4-7.5 9-7.5s9 3.36 9 7.5c0 1.59-.59 3.05-1.59 4.25l.29 2.92L13 17.72c-1.23.43-2.55.67-3.91.67z"></path>
            </svg>
            Phone
          </Button>
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-2">
          {type === "login" ? "Don't have an account? " : "Already have an account? "}
          <Link 
            to={type === "login" ? "/register" : "/login"} 
            className="text-primary hover:underline font-medium"
          >
            {type === "login" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
