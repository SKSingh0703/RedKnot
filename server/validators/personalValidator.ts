import { body } from "express-validator";

export const personalValidator = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("addressLine1").notEmpty(),
  body("city").notEmpty(),
  body("state").notEmpty(),
  body("zipcode").notEmpty(),
];
