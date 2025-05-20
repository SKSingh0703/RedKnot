import  express  from "express";
import { projectValidator } from "../validators/projectValidator";
import { submitProjectDetails } from "../controllers/projectsController";
import { validationResult } from "express-validator";

const router = express.Router();

router.post("/",projectValidator,(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    submitProjectDetails(req, res); 
})



export default router;