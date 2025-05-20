import { body } from "express-validator";

const educationValidator = [
    body("studying").notEmpty(),
    body("email").isEmail() 
]

export { educationValidator };