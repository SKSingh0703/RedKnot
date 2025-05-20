import {z} from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().optional().transform(val => val ?? ""),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipcode: z.string().regex(/^\d{5,6}$/, "Invalid Zipcode"),
})

export type PersonalInfoType = z.infer<typeof personalInfoSchema>;