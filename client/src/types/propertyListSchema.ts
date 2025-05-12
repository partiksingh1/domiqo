import { z } from "zod";

export const PropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  addressLine1: z.string().min(1),
  addressLine2: z.string().min(1),
  city: z.string().min(1),
  county: z.string().min(1),
  propertyType: z.enum(["APARTMENT", "HOUSE", "CONDO", "TOWNHOUSE"], {
    errorMap: () => ({ message: "Property type is required" }),
  }),
  status: z.enum(["AVAILABLE", "SOLD", "RENTED"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  numBedrooms: z.number().min(0, "Number of bedrooms must be positive"),
  numBathrooms: z.number().min(0, "Number of bathrooms must be positive"),
  squareMeters: z.number().min(0, "Square meters must be positive"),
  yearBuilt: z.number().min(1900, "Year built must be valid"),
  latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  longitude: z
    .number()
    .min(-180)
    .max(180, "Longitude must be between -180 and 180"),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"), // Adjust if optional
  features: z.any().optional(),
  userId: z.number().min(1, "User ID is required"),
});

export type PropertyFormData = z.infer<typeof PropertySchema>;