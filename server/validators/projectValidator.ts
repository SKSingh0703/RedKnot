import { body } from "express-validator";

export const projectValidator = [
    body("projects").notEmpty(),
    body("email").isEmail(), 
]