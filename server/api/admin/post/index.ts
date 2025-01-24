import formidable from "formidable";
import { supabase } from "@/supabaseClient";
import { promises as fs } from "fs";

interface FormData {
  title: string;
  content: string;
  introduction: string;
  author: string;
  id_category: string;
  status: string;
}

export const config = {
  bodyParser: false, // Disable bodyParser to handle multipart/form-data
};

export default defineEventHandler(async (event) => {
  if (event.req.method !== "POST") {
    return sendError(
      event,
      createError({ statusCode: 405, message: "Method not allowed" })
    );
  }

  try {
    // Create a form for handling multipart/form-data
    const form = formidable({
      multiples: true,
      maxFileSize: 50 * 1024 * 1024, // Max file size: 50MB
      keepExtensions: true,
    });

    const formData = await new Promise<{
      fields: FormData;
      files: formidable.File[];
    }>((resolve, reject) => {
      const fields: FormData = {
        title: "",
        content: "",
        introduction: "",
        author: "",
        id_category: "",
        status: "",
      };
      const fileList: formidable.File[] = [];

      form.on("field", (name, value) => {
        fields[name as keyof FormData] = value as string;
      });

      form.on("file", (_, file) => {
        fileList.push(file);
      });

      form.on("end", () => resolve({ fields, files: fileList }));
      form.on("error", (err) => {
        console.error("Formidable error:", err);
        reject(createError({ statusCode: 400, message: "Invalid form data" }));
      });

      form.parse(event.req);
    });

    const { fields, files } = formData;
    const { title, content, introduction, author, id_category, status } =
      fields;

    // Validate required fields
    if (
      !title ||
      !content ||
      !introduction ||
      !author ||
      !id_category ||
      !status
    ) {
      return sendError(
        event,
        createError({ statusCode: 400, message: "Missing required fields" })
      );
    }

    // Validate file upload
    if (!files || files.length === 0) {
      return sendError(
        event,
        createError({ statusCode: 400, message: "No files uploaded" })
      );
    }

    const urls: string[] = [];

    // Upload files to Supabase Storage
    for (const file of files) {
      try {
        const fileData = await fs.readFile(file.filepath);
        const fileName = `${Date.now()}_${file.originalFilename}`;

        const { error: uploadError } = await supabase.storage
          .from("post")
          .upload(fileName, fileData, {
            cacheControl: "3600",
            contentType: file.mimetype || "application/octet-stream",
          });

        if (uploadError) {
          console.error("Supabase upload error:", uploadError);
          throw new Error(uploadError.message);
        }

        const { data } = supabase.storage
          .from("post")
          .getPublicUrl(fileName);

        if (data?.publicUrl) {
          urls.push(data.publicUrl);
        } else {
          console.error("Failed to retrieve public URL for:", fileName);
          throw new Error("Failed to retrieve public URL");
        }
      } catch (error) {
        console.error("Error processing file:", file.originalFilename, error);
        throw createError({
          statusCode: 500,
          message: `Error processing file: ${file.originalFilename}`,
        });
      }
    }

    // Insert post data into the database
    try {
      const { data, error } = await supabase.from("posts").insert([
        {
          title,
          content,
          description: introduction,
          author,
          category_id: parseInt(id_category, 10),
          status_id: parseInt(status, 10),
          image: urls[0],
        },
      ]);

      if (error) {
        console.error("Database insert error:", error);
        throw new Error(error.message);
      }

      return { status: "ok", message: "Post inserted successfully", data };
    } catch (error) {
      console.error("Error inserting data into database:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to insert post data",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Unhandled error:", error.message, error.stack);
      return sendError(
        event,
        createError({ statusCode: 500, message: error.message })
      );
    } else {
      console.error("Unknown error:", JSON.stringify(error));
      return sendError(
        event,
        createError({ statusCode: 500, message: "An unknown error occurred" })
      );
    }
  }
});
