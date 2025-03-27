
import { Link } from "react-router-dom";

interface FormFooterProps {
  type: "login" | "register";
}

const FormFooter = ({ type }: FormFooterProps) => {
  return (
    <div className="space-y-2">
      <p className="text-center text-sm text-gray-600">
        {type === "login" ? "Don't have an account? " : "Already have an account? "}
        <Link 
          to={type === "login" ? "/register" : "/login"} 
          className="text-primary hover:underline font-medium"
        >
          {type === "login" ? "Sign up" : "Sign in"}
        </Link>
      </p>
      
      {type === "login" && (
        <p className="text-center text-xs text-gray-500 mt-1">
          Experiencing connection issues? Try using the demo account option above.
        </p>
      )}
    </div>
  );
};

export default FormFooter;
