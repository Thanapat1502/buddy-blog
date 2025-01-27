import { defineEventHandler, readBody } from "h3";
import { supabase } from "~/supabaseClient";

export default defineEventHandler(async (event) => {
   if (event.req.method === "POST") {
    // อ่านข้อมูลจาก request body
    const body = await readBody(event);
    const { name } = body;

    // ตรวจสอบว่ามีการส่ง name มาหรือไม่
    if (!name) {
      return { success: false, message: "Name is required" };
    }

    // เพิ่มข้อมูลลงใน Supabase และดึงข้อมูลที่เพิ่มไปกลับมา
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name }])
      .select("id, name");

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, category: data[0] };
  }

  if (event.req.method === "GET") {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("id, name");

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, categories };
  }

  return { success: false, message: "Invalid method" };
});
