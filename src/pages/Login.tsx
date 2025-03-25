
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-24 px-6 md:px-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <AuthForm type="login" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
