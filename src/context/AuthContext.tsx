
import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, UserProfile } from "@/services/auth";

type User = {
  id: string;
  name: string;
  email: string;
  role: "donor" | "recipient" | "hospital";
  blood_type?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData && userData.profile) {
          setUser({
            id: userData.user.id,
            name: userData.profile.name,
            email: userData.profile.email,
            role: userData.profile.role,
            blood_type: userData.profile.blood_type,
          });
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { profile } = await authService.login(email, password);
      
      setUser({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role,
        blood_type: profile.blood_type,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, "id"> & { password: string }) => {
    setIsLoading(true);
    try {
      await authService.register(userData.email, userData.password, {
        name: userData.name,
        role: userData.role,
        blood_type: userData.blood_type,
      });
      
      // Login the user after registration
      await login(userData.email, userData.password);
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
