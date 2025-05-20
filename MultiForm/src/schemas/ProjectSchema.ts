import { z } from "zod";

export const projectSchema = z.object({
    projects:z.array(z.object({
        name:z.string().min(1, "Name is required"),
        description:z.string().optional().transform(val => val ?? ""),
    }))
})