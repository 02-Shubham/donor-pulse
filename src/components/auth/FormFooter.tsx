
import { Link } from "react-router-dom";

interface FormFooterProps {
  type: "login" | "register";
}

const FormFooter = ({ type }: FormFooterProps) => {
  return (
    <p className="text-center text-sm text-gray-600 mt-2">
      {type === "login" ? "Don't have an account? " : "Already have an account? "}
      <Link 
        to={type === "login" ? "/register" : "/login"} 
        className="text-primary hover:underline font-medium"
      >
        {type === "login" ? "Sign up" : "Sign in"}
      </Link>
    </p>
  );
};

export default FormFooter;
