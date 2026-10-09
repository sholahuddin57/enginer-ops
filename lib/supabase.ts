import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabasePublishKey = process.env.NEXT_PUBLIC_ANON_KEY as string;

if (!supabaseUrl || !supabasePublishKey) {
    throw new Error("Supabase URL dan Publish Key harus didefinisikan di environment variables");
    
}

export const supabase = createClient(supabaseUrl, supabasePublishKey);