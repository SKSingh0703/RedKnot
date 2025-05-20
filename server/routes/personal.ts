import express from "express";
import { validationResult } from "express-validator";
import { personalValidator } from "../validators/personalValidator";
import { submitPersonalDetails } from "../controllers/personalController";

const router = express.Router();

router.post("/", personalValidator, (req:any, res:any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    submitPersonalDetails(req, res);
});

export default router;
