
import { supabase } from '@/lib/supabase';

export type UserRole = 'donor' | 'recipient' | 'hospital';

// Define the profile type for the database
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  blood_type?: string; // Optional for hospitals
}

export const authService = {
  // Register a new user
  async register(email: string, password: string, userData: Omit<UserProfile, 'id' | 'email'>) {
    console.log('Registering user with:', { email, userData });
    
    try {
      // Register the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error('Auth error during registration:', authError);
        throw new Error(authError.message);
      }
      
      if (!authData.user) {
        console.error('User registration failed - no user returned');
        throw new Error('User registration failed');
      }
      
      // Create a profile in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email,
          name: userData.name,
          role: userData.role,
          blood_type: userData.blood_type,
          created_at: new Date(),
        });
        
      if (profileError) {
        console.error('Profile error during registration:', profileError);
        throw new Error(profileError.message);
      }
      
      return authData.user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  
  // Login an existing user
  async login(email: string, password: string) {
    console.log('Logging in user:', email);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        throw new Error(error.message);
      }
      
      // Get user profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (profileError) {
        console.error('Profile fetch error:', profileError);
        throw new Error(profileError.message);
      }
      
      return { user: data.user, profile: profileData };
    } catch (error) {
      console.error('Login process failed:', error);
      throw error;
    }
  },
  
  // Logout the current user
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },
  
  // Get the current user
  async getCurrentUser() {
    const { data } = await supabase.auth.getUser();
    
    if (!data.user) return null;
    
    // Get user profile data
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    return { user: data.user, profile: profileData || null };
  }
};
