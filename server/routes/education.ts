import { validationResult } from "express-validator";
import {educationValidator} from "../validators/educationValidator";
import { submitEducationDetails } from "../controllers/educationController";
const router = require('express').Router();

router.post("/",educationValidator, (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });    
    }
    submitEducationDetails(req, res);
});

export default router;