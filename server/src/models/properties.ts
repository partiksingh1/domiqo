import { z } from "zod";

export const PropertySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().positive(),
  addressLine1: z.string().min(1),
  addressLine2: z.string().min(1),
  city: z.string().min(1),
  county: z.string().min(1),
  propertyType: z.enum(["APARTMENT", "HOUSE", "COMMERCIAL", "LAND"]),
  status: z.enum(["AVAILABLE", "SOLD", "RENTED"]),
  numBedrooms: z.coerce.number().int().nonnegative(),
  numBathrooms: z.coerce.number().int().nonnegative(),
  squareMeters: z.coerce.number().positive(),
  yearBuilt: z.coerce.number(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  features: z.string().optional(),
  userId: z.coerce.number(),
});
