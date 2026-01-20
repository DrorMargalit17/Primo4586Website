import { z } from "zod";

// Authentication validation schemas
export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string()
    .min(12, { message: "Password must be at least 12 characters" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

// Sponsor validation schema
export const sponsorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  website: z
    .string()
    .trim()
    .url({ message: "Invalid URL format" })
    .max(255, { message: "URL must be less than 255 characters" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  since: z
    .string()
    .trim()
    .min(1, { message: "Year is required" })
    .max(50, { message: "Year must be less than 50 characters" }),
});

// Team member validation schema
export const teamMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  role: z
    .string()
    .trim()
    .max(100, { message: "Role must be less than 100 characters" })
    .optional(),
  section: z
    .string()
    .trim()
    .min(1, { message: "Section is required" })
    .max(50, { message: "Section must be less than 50 characters" }),
  year: z
    .string()
    .trim()
    .max(20, { message: "Year must be less than 20 characters" })
    .optional(),
});

// Event validation schema
export const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  date: z
    .string()
    .min(1, { message: "Date is required" }),
  time: z
    .string()
    .trim()
    .min(1, { message: "Time is required" })
    .max(50, { message: "Time must be less than 50 characters" }),
  location: z
    .string()
    .trim()
    .max(200, { message: "Location must be less than 200 characters" })
    .optional(),
  description: z
    .string()
    .trim()
    .max(1000, { message: "Description must be less than 1000 characters" })
    .optional(),
});

// Resource validation schema
export const resourceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(200, { message: "Name must be less than 200 characters" }),
  link: z
    .string()
    .trim()
    .url({ message: "Invalid URL format" })
    .max(500, { message: "URL must be less than 500 characters" }),
  type: z
    .string()
    .trim()
    .min(1, { message: "Type is required" })
    .max(50, { message: "Type must be less than 50 characters" }),
  category: z
    .string()
    .trim()
    .min(1, { message: "Category is required" })
    .max(50, { message: "Category must be less than 50 characters" }),
});

// Community activity validation schema
export const communityActivitySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
});

// Contact form validation schema
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z
    .string()
    .trim()
    .min(1, { message: "Subject is required" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});
