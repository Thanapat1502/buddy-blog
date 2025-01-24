import { supabase } from "@/supabaseClient"; // Adjust the path to your Supabase client

export default defineEventHandler(async (event) => {
  try {
    // Fetch categories from Supabase
    const { data, error } = await supabase.from("categories").select("*");

    // Handle errors
    if (error) {
      console.error("Error fetching categories:", error.message);
      return sendError(
        event,
        createError({ statusCode: 500, message: "Failed to fetch categories" })
      );
    }

    // Return categories data
    return {
      status: "ok",
      data,
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return sendError(
      event,
      createError({ statusCode: 500, message: "An unexpected error occurred" })
    );
  }
});
