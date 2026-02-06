import { z } from "zod";

/* ============================================================
   Ambassador submission schema
   ============================================================ */
export const ambassadorSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  instagram: z
    .string()
    .min(1, "Instagram handle is required")
    .max(60, "Instagram handle is too long")
    .regex(
      /^@?[\w.]{1,30}$/,
      "Enter a valid Instagram handle (e.g. @good_intent_poor_product)"
    ),
  contentType: z.enum(["photo", "video", "reel", "story", "tiktok", "other"], {
    errorMap: () => ({ message: "Select a content type" }),
  }),
  contentUrl: z
    .string()
    .url("Enter a valid URL for your content")
    .max(500, "URL is too long"),
  message: z
    .string()
    .max(1000, "Message must be under 1,000 characters")
    .optional()
    .or(z.literal("")),
});

export type AmbassadorFormValues = z.infer<typeof ambassadorSchema>;

/* ============================================================
   Recruit application schema
   ============================================================ */
export const recruitSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .email("Enter a valid email address")
    .max(254, "Email is too long"),
  position: z.enum(["GK", "DEF", "MID", "FWD"], {
    errorMap: () => ({ message: "Select a position" }),
  }),
  experience: z
    .string()
    .min(10, "Tell us a bit more about your experience (at least 10 characters)")
    .max(2000, "Experience must be under 2,000 characters"),
  highlightTapeUrl: z
    .string()
    .url("Enter a valid URL for your highlight tape")
    .max(500, "URL is too long"),
  whyGipp: z
    .string()
    .min(10, "Tell us why you want to join GIPP (at least 10 characters)")
    .max(2000, "Response must be under 2,000 characters"),
});

export type RecruitFormValues = z.infer<typeof recruitSchema>;

/* ============================================================
   Moodboard item schema
   ============================================================ */
export const moodboardSchema = z.object({
  submittedBy: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters"),
  type: z.enum(["image", "quote", "link", "video"], {
    errorMap: () => ({ message: "Select a content type" }),
  }),
  content: z
    .string()
    .min(1, "Content is required")
    .max(2000, "Content must be under 2,000 characters"),
  caption: z
    .string()
    .max(500, "Caption must be under 500 characters")
    .optional()
    .or(z.literal("")),
  week: z
    .number({ invalid_type_error: "Week must be a number" })
    .int("Week must be a whole number")
    .min(1, "Week must be at least 1")
    .max(52, "Week must be 52 or less"),
});

export type MoodboardFormValues = z.infer<typeof moodboardSchema>;
