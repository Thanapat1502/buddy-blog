import { defineEventHandler } from "h3";
import { supabase } from "@/supabaseClient";

export default defineEventHandler(async () => {
  const { data, error } = await supabase.from("posts").select(`
      id,
      image,
      title,
      description,
      date,
      content,
      likes_count,
      categories (name),
      statuses (status),
      author,
      date`);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
});
