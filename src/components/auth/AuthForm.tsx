
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
        {type === "login" && (
          <Alert className="mb-4 bg-blue-50 text-blue-700 border border-blue-200">
            <AlertDescription>
              If you're experiencing connection issues, you can use the demo account option.
            </AlertDescription>
          </Alert>
        )}
        {type === "login" ? <LoginForm /> : <RegisterForm />}
      </CardContent>
    </Card>
  );
};

export default AuthForm;
