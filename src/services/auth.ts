
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
    // Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw new Error(authError.message);
    
    if (!authData.user) throw new Error('User registration failed');
    
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
      
    if (profileError) throw new Error(profileError.message);
    
    return authData.user;
  },
  
  // Login an existing user
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw new Error(error.message);
    
    // Get user profile data
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    if (profileError) throw new Error(profileError.message);
    
    return { user: data.user, profile: profileData };
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
