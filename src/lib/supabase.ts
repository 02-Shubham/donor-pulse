
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
// In a real app, these would be environment variables
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
