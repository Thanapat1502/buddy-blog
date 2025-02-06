// นำเข้าโมดูลที่ใช้จาก h3 framework
import { defineEventHandler, readBody, getQuery } from "h3";

// นำเข้า Supabase client ที่กำหนดค่าไว้
import { supabase } from "~/supabaseClient";

// กำหนด event handler สำหรับ API
export default defineEventHandler(async (event) => {
  // ตรวจสอบว่า request ที่เข้ามาเป็น HTTP method "DELETE"
  if (event.req.method === "DELETE") {
    const query = getQuery(event);
    const { id } = query;

    if (!id) {
      return { success: false, message: "ID is required" };
    }

    const { data, error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Category deleted successfully" };
  }

  // ตรวจสอบว่า request ที่เข้ามาเป็น HTTP method "PUT"
  if (event.req.method === "PUT") {
    const body = await readBody(event);
    const { id, name } = body;

    if (!id || !name) {
      return { success: false, message: "ID and Name are required" };
    }

    const { data, error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", id)
      .select("id, name");

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, category: data[0] };
  }

  // ตรวจสอบว่า request ที่เข้ามาเป็น HTTP method "POST"
  else if (event.req.method === "POST") {
    const body = await readBody(event);
    const { name } = body;

    if (!name) {
      return { success: false, message: "Name is required" };
    }

    const { data, error } = await supabase
      .from("categories")
      .insert([{ name }])
      .select("id, name");

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, category: data[0] };
  }

  // ตรวจสอบว่า request ที่เข้ามาเป็น HTTP method "GET"
  else if (event.req.method === "GET") {
    const query = getQuery(event);
    const { id } = query;

    let queryBuilder = supabase.from("categories").select("id, name");

    if (id) {
      queryBuilder = queryBuilder.eq("id", id);
    }

    const { data: categories, error } = await queryBuilder;

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, categories };
  }

  // กรณีที่ไม่ได้ใช้ HTTP method ที่รองรับ
  return { success: false, message: "Invalid method" };
});
