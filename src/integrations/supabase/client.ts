// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gwnuhslrgarqeyexrjtd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bnVoc2xyZ2FycWV5ZXhyanRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODE2MTQsImV4cCI6MjA2MTg1NzYxNH0.e8rXvHfn4H4zwTCvjjZbXq9-OlKOfoW2UTrSi_ODMgI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);