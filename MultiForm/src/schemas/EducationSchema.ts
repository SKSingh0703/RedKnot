import { z } from "zod";

export const educationSchema = z.object({
    studying: z.coerce.boolean(),
    institution: z.string().optional().transform(val => val ?? ""),
}).refine((data)=>data.studying === true ? data.institution !== "" : true, {
    message: "Institution is required when studying is true",
    path: ["institution"],
})