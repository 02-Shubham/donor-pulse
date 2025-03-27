
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with valid credentials
// Using environment variables is recommended for a production app
const supabaseUrl = 'https://lrmstjrsdgzqskvpbbdr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxybXN0anJzZGd6cXNrdnBiYmRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3MTY4NzAsImV4cCI6MjAzMjI5Mjg3MH0.D-W8nZ4sCgaKd2_RZmEPv5TpTKG3LbsUaEZh-g6YvZs';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
