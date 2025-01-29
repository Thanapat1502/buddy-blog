import { supabase } from "@/supabaseClient";

export default defineEventHandler(async (event) => {
  try {
    const { data, error } = await supabase.from("posts").select(`
        id, image, title, description, date, content, likes_count, author,
        categories (name),
        statuses (status)
      `);

    // Handle errors
    if (error) {
      console.error("Error fetching posts:", error.message);
      return sendError(
        event,
        createError({ statusCode: 500, message: "Failed to fetch posts" })
      );
    }

    // Return transformed data
    return {
      status: "ok",
      data: data,
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return sendError(
      event,
      createError({ statusCode: 500, message: "An unexpected error occurred" })
    );
  }
});
