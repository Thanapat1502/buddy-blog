import { defineEventHandler } from "h3";
import { supabase } from "@/supabaseClient";

export default defineEventHandler(async () => {
  // ดึงข้อมูลจากตาราง posts
  const { data, error } = await supabase.from("posts").select(`
      id,
      title,
      description,
      date,
      content,
      likes_count,
      categories (name),
      statuses (status)
    `); // ใช้คำสั่ง join เพื่อดึงข้อมูล category และ status

  if (error) {
    // ถ้ามี error ให้ return กลับ
    return { success: false, message: error.message };
  }

  return { success: true, data };
});
