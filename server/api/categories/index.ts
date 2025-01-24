import { defineEventHandler } from "h3";
import { supabase } from "~/supabaseClient";

export default defineEventHandler(async () => {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name");

  if (error) {
    return { success: false, statusCode: 400, message: error.message };
  }

  return { success: true, statusCode: 200, categories };
});
