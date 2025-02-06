import { supabase } from "@/supabaseClient";

export default defineEventHandler(async (event) => {
  try {
    // ดึง id จาก dynamic route
    const id = event.context.params?.id;

    if (!id) {
      return sendError(
        event,
        createError({ statusCode: 400, message: "Post ID is required" })
      );
    }

    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id, image, title, description, date, content, likes_count, author,
        categories (name),
        statuses (status)
      `
      )
      .eq("id", id);

    if (error) {
      console.error("Error fetching post:", error.message);
      return sendError(
        event,
        createError({ statusCode: 500, message: "Failed to fetch post" })
      );
    }

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
