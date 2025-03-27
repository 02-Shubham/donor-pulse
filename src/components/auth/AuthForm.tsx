import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthFormProps {
  type: "login" | "register";
}

export const AuthForm = ({ type }: AuthFormProps) => {
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
        {type === "login" ? <LoginForm /> : <RegisterForm />}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {/* The Footer is now inside the form components */}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
