import { defineEventHandler, getQuery } from "h3";
import { supabase } from "@/supabaseClient";

export default defineEventHandler(async (event) => {
  const { category, keyword, limit } = getQuery(event);
  console.log(`limit: `, limit);
  console.log(`category: `, category);
  console.log(`keyword: `, keyword);
  console.log(`_____________________`);
  let pageLimit = limit;
  if (!limit || Number(limit) < 1) {
    pageLimit = 10;
  }
  console.log("pageLimit: ", pageLimit);
  let query = supabase
    .from("posts")
    .select(
      `
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
    date`
    )
    .limit(Number(pageLimit));

  if (category) {
    console.log(`test I`);
    query = query.eq("category_id", category);
  }

  if (keyword) {
    console.log(`test II`);
    query = query.ilike("title", `%${keyword}%`);
  }
  if (category && keyword) {
    console.log(`test III`);
    query = query
      .ilike("title", `%${keyword}%`)
      .eq("categories.name", category);
  }

  console.log("q3: ", query);

  const { data, error } = await query;
  // console.log("**********_____________**************");
  // console.log("data:");
  // console.log(data);
  // console.log("**********_____________**************");

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
});
