
// import React, { createContext, useContext, useState, useEffect } from "react";

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   role: "donor" | "recipient" | "hospital";
// };

// type AuthContextType = {
//   user: User | null;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (userData: Omit<User, "id"> & { password: string }) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check for stored user in localStorage on initial load
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       // Mock login - in a real app this would call your backend API
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
//       // Mock user data - in production this would come from your auth provider
//       const mockUser: User = {
//         id: "user123",
//         name: email.split("@")[0], // Use part before @ as name
//         email,
//         role: "donor", // Default role
//       };
      
//       setUser(mockUser);
//       localStorage.setItem("user", JSON.stringify(mockUser));
//     } catch (error) {
//       console.error("Login failed:", error);
//       throw new Error("Login failed. Please check your credentials.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const register = async (userData: Omit<User, "id"> & { password: string }) => {
//     setIsLoading(true);
//     try {
//       // Mock registration - in a real app this would call your backend API
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
//       // Mock user creation
//       const newUser: User = {
//         id: `user_${Date.now()}`,
//         name: userData.name,
//         email: userData.email,
//         role: userData.role,
//       };
      
//       setUser(newUser);
//       localStorage.setItem("user", JSON.stringify(newUser));
//     } catch (error) {
//       console.error("Registration failed:", error);
//       throw new Error("Registration failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   const value = {
//     user,
//     isLoading,
//     login,
//     register,
//     logout,
//     isAuthenticated: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth, db } from "../lib/firebase"; // Ensure correct import
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const register = async ({ name, email, password, role }) => {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     await setDoc(doc(db, "users", user.uid), { name, email, role });
//   };

//   const googleProvider = new GoogleAuthProvider();

//   const signInWithGoogle = async () => {
//    const result = await signInWithPopup(auth, googleProvider);
//    const user = result.user;

//    // Save user to Firestore if new
//    const userRef = doc(db, "users", user.uid);
//    await setDoc(userRef, { name: user.displayName, email: user.email, role: "donor" }, { merge: true });
//   };

//   const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

//   const logout = () => signOut(auth);

//   return (
//     <AuthContext.Provider value={{ currentUser, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../lib/firebase"; // Make sure you have a firebase.ts file with Firebase initialized
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";

// Define User Type
type User = {
  id: string;
  name: string;
  email: string;
  role: "donor" | "recipient" | "hospital";
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Convert Firebase User to Our User Type
  const mapFirebaseUser = (firebaseUser: FirebaseUser | null): User | null => {
    if (!firebaseUser) return null;
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
      email: firebaseUser.email || "",
      role: "donor", // Default role (can be modified later)
    };
  };

  // Listen for Firebase Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const mappedUser = mapFirebaseUser(firebaseUser);
      setUser(mappedUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login Function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(mapFirebaseUser(userCredential.user));
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  // Register Function
  const register = async (userData: Omit<User, "id"> & { password: string }) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      setUser(mapFirebaseUser(userCredential.user));
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout Function
  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
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

// Custom Hook for Authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


