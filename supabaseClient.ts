import { createClient } from "@supabase/supabase-js";

// ดึงค่า environment variables
const supabaseUrl = useRuntimeConfig().public.SUPABASE_URL as string;
const supabaseKey = useRuntimeConfig().public.SUPABASE_KEY as string;

// สร้าง client สำหรับเชื่อมต่อ Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
